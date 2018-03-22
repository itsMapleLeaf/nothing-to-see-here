import dotenv from "dotenv"
import express from "express"
import neo4j from "neo4j-driver"
import { resolve } from "path"
import { getEnvValue } from "./env"
import { userExists } from "./db"

// create express app
const port = Number(getEnvValue("PORT", "3000"))

const app = express()

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(port, async () => {
  console.log(`server listening on http://localhost:${port}`)

  console.log("nobody exists:", await userExists("nobody"))
  console.log("somebody exists:", await userExists("somebody"))
})
