import { Component } from "@nestjs/common"
import neo4j from "neo4j-driver"

import { createHash } from "../src.old/helpers/secure-password"
import { databasePass, databaseUrl, databaseUser } from "./env"
import { NewUserDetails } from "./new-user-details.model"

const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))
const session = driver.session()

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

  async createAccount(details: NewUserDetails) {
    const passwordHash = await createHash(Buffer.from(details.password))
    await session.run(`create (:User $details)`, {
      details: { ...details, password: passwordHash.toString() },
    })
  }
}
