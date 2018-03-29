import { Component } from "@nestjs/common"
import securePassword from "secure-password"

import { DatabaseService } from "./database.service"
import { randomBytesPromise } from "./helpers/random-bytes-promise"
import { createHash, verifyHash } from "./helpers/secure-password"
import { RegisterDto } from "./register.dto"
import { User } from "./user.model"

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24

@Component()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    const query = `
      match (u:User)
      where u.username = {usernameOrEmail} or u.email = {usernameOrEmail}
      return properties(u) as user
    `

    const dbResult = await this.db.runQuery(query, { usernameOrEmail })
    const record = dbResult.records[0]

    if (record) {
      return record.get("user") as User
    }
  }

  async rehashPassword(username: string, password: string) {
    const improvedHash = (await createHash(Buffer.from(password))).toString()

    const rehashQuery = `
      match (u:User { username: {username} })
      set u.password = {improvedHash}
    `

    await this.db.runQuery(rehashQuery, { username, improvedHash })
  }

  async createUser(details: RegisterDto) {
    const passwordHash = await createHash(Buffer.from(details.password))
    await this.db.runQuery(`create (:User $details)`, {
      details: { ...details, password: passwordHash.toString() },
    })
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const query = `
      match (u:User { username: {username} })
      return u
    `
    const { records } = await this.db.runQuery(query, { username })
    return records.length > 0
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const query = `
      match (u:User { email: {email} })
      return u
    `
    const { records } = await this.db.runQuery(query, { email })
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

    await this.db.runQuery(tokenHashQuery, {
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

    const result = await this.db.runQuery(getUserQuery, { username })
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

    await this.db.runQuery(rehashQuery, { username, improvedHash })
  }

  async clearToken(username: string) {
    const query = `
      match (u:User { username: {username} })
      set u.token = null
      set u.tokenDate = 0
    `
    await this.db.runQuery(query, { username })
  }
}
