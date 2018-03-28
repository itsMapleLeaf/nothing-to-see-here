import { Component } from "@nestjs/common"
import neo4j from "neo4j-driver"

import { createHash } from "../src.old/helpers/secure-password"
import { databasePass, databaseUrl, databaseUser } from "./env"

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
}
