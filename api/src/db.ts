import neo4j from "neo4j-driver"

import { databasePass, databaseUrl, databaseUser } from "./env"

const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))

driver.onCompleted = async () => {
  console.info("successfully connected to database")
}

driver.onError = error => {
  console.info("db connection error:", error.message)
}

export const session = driver.session()
