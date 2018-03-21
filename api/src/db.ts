import neo4j from "neo4j-driver"

const { DB_URL = "", DB_USER = "", DB_PASS = "" } = process.env

const driver = neo4j.driver(DB_URL, neo4j.auth.basic(DB_USER, DB_PASS))

driver.onCompleted = async () => {
  console.log("successfully connected to database")
}

driver.onError = error => {
  console.log("db connection error:", error.message)
}

const session = driver.session()

export async function userExists(username: string) {
  const { records } = await session.run(
    "match (u:User { username: {username} }) return true limit 1",
    { username },
  )
  return records.length > 0
}
