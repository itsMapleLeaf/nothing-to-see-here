import dotenv from "dotenv"
import express from "express"
import neo4j from "neo4j-driver"
import { resolve } from "path"

// configure dotenv
dotenv.config({
  path: resolve(__dirname, "../../.env"),
})

// connect to database
const { DB_URL = "", DB_USER = "", DB_PASS = "" } = process.env

const driver = neo4j.driver(DB_URL, neo4j.auth.basic(DB_USER, DB_PASS))

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

// create express app
const port = Number(process.env.PORT) || 3000

const app = express()

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(port, async () => {
  console.log(`server listening on http://localhost:${port}`)

  console.log("nobody exists:", await userExists("nobody"))
  console.log("somebody exists:", await userExists("somebody"))
})
