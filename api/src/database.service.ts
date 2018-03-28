import { Component } from "@nestjs/common"
import neo4j from "neo4j-driver"

import { databasePass, databaseUrl, databaseUser } from "./env"

const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))
const session = driver.session()

@Component()
export class DatabaseService {
  runQuery(query: string, params?: object) {
    return session.run(query, params)
  }
}
