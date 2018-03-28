import { Component } from "@nestjs/common"
import neo4j from "neo4j-driver"
import securePassword from "secure-password"

import { createHash, verifyHash } from "../src.old/helpers/secure-password"
import { databasePass, databaseUrl, databaseUser } from "./env"
import { randomBytesPromise } from "./helpers/random-bytes-promise"
import { NewUserDetails } from "./new-user-details.model"

const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))
const session = driver.session()

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24

@Component()
export class DatabaseService {
  async getUserByUsernameOrEmail(usernameOrEmail: string) {
    const query = `
      match (u:User)
      where u.username = {usernameOrEmail} or u.email = {usernameOrEmail}
      return u.username, u.password
    `

    const dbResult = await session.run(query, { usernameOrEmail })
    const record = dbResult.records[0]

    if (record) {
      const username = String(record.get("u.username"))
      const password = String(record.get("u.password"))
      return { username, password }
    }
  }

  async rehashPassword(username: string, password: string) {
    const improvedHash = (await createHash(Buffer.from(password))).toString()

    const rehashQuery = `
      match (u:User { username: {username} })
      set u.password = {improvedHash}
    `

    await session.run(rehashQuery, { username, improvedHash })
  }

  async createAccount(details: NewUserDetails) {
    const passwordHash = await createHash(Buffer.from(details.password))
    await session.run(`create (:User $details)`, {
      details: { ...details, password: passwordHash.toString() },
    })
  }

  async usernameTaken(username: string): Promise<boolean> {
    const query = `
      match (u:User { username: {username} })
      return u
    `
    const { records } = await session.run(query, { username })
    return records.length > 0
  }

  async emailTaken(email: string): Promise<boolean> {
    const query = `
      match (u:User { email: {email} })
      return u
    `
    const { records } = await session.run(query, { email })
    return records.length > 0
  }

  async createToken(username: string) {
    const token = (await randomBytesPromise(32)).toString("hex")
    const tokenHash = await createHash(Buffer.from(token))

    const tokenHashQuery = `
      match (u:User { username: {username} })
      set u.token = {token}
      set u.tokenDate = {tokenDate}
    `

    await session.run(tokenHashQuery, {
      username,
      token: tokenHash.toString(),
      tokenDate: Date.now(),
    })

    return token
  }

  async verifyToken(username: string, enteredToken: string): Promise<true> {
    const getUserQuery = `
      match (u:User { username: {username} })
      return u.token, u.tokenDate
    `

    const result = await session.run(getUserQuery, { username })
    const record = result.records[0]

    if (!record) {
      throw Error(`User not found: "${username}"`)
    }

    const currentToken = String(record.get("u.token"))
    const tokenDate = Number(record.get("u.tokenDate")) || 0

    const verifyResult = await verifyHash(Buffer.from(enteredToken), Buffer.from(currentToken))

    switch (verifyResult) {
      case securePassword.VALID:
        break

      case securePassword.VALID_NEEDS_REHASH:
        await this.rehashToken(username, enteredToken)
        break

      case securePassword.INVALID:
        throw Error(`Invalid token`)

      case securePassword.INVALID_UNRECOGNIZED_HASH:
        throw Error(`Unrecognized hash`)

      default:
        console.error(`unknown verification result`)
        throw Error(`Internal error`)
    }

    const currentDate = Date.now()

    if (currentDate - tokenDate > TOKEN_EXPIRATION_TIME) {
      throw Error(`Token has expired`)
    }

    return true
  }

  async rehashToken(username: string, token: string) {
    const improvedHash = (await createHash(Buffer.from(token))).toString()

    const rehashQuery = `
      match (u:User { username: {username} })
      set u.token = {improvedHash}
    `

    await session.run(rehashQuery, { username, improvedHash })
  }
}
