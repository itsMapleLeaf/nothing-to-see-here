import neo4j from "neo4j-driver"
import { getEnvValue } from "./env"

// connect to database
const url = getEnvValue("DB_URL")
const user = getEnvValue("DB_USER")
const pass = getEnvValue("DB_PASS")

const driver = neo4j.driver(url, neo4j.auth.basic(user, pass))

driver.onCompleted = async () => {
  console.log("successfully connected to database")
}

driver.onError = error => {
  console.log("db connection error:", error.message)
}

const session = driver.session()

// define DB action functions
export async function userExists(username: string) {
  const { records } = await session.run(
    "match (u:User { username: {username} }) return true limit 1",
    { username },
  )
  return records.length > 0
}
