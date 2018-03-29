import cors from "cors"
import express, { ErrorRequestHandler, RequestHandler } from "express"
import neo4j from "neo4j-driver"

import { databasePass, databaseUrl, databaseUser, port } from "./env"
import { createHash } from "./helpers/secure-password"

function connectToDatabase(): Promise<neo4j.Session> {
  return new Promise((resolve, reject) => {
    const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))

    driver.onError = message => {
      console.error("Error connecting to database:", message)
    }

    driver.onCompleted = () => {
      resolve(driver.session())
    }
  })
}

function errorIfUserExists(session: neo4j.Session): RequestHandler {
  return async (req, res, next) => {
    try {
      const { username, email } = req.body

      const userExistsQuery = `
        match (u:User)
        where u.username = {username} or u.email = {email}
        return properties(u) as user
      `

      const { records } = await session.run(userExistsQuery, {})
      const userRecord = records[0]

      if (userRecord) {
        const user = userRecord.get("user")
        if (user.email === email) {
          res.status(400).send({ error: "Email already exists" })
        } else if (user.username === username) {
          res.status(400).send({ error: "Username already exists" })
        }
        return
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

function createUser(session: neo4j.Session): RequestHandler {
  return async (req, res, next) => {
    try {
      const { username, email, password, displayName } = req.body

      const passwordHash = await createHash(Buffer.from(password))

      const details = { username, email, displayName, password: passwordHash.toString() }
      const newAccountQuery = `create (:User $details)`
      await session.run(newAccountQuery, { details })

      res.status(200).send({})
    } catch (error) {
      next(error)
    }
  }
}

function handleInternalError(): ErrorRequestHandler {
  return (error, req, res, next) => {
    res.status(500).send({ error: "Internal error" })
    console.error("Internal error:", error)
  }
}

function runServer(session: neo4j.Session) {
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.post("/register", errorIfUserExists(session), createUser(session), handleInternalError())

  app.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}

async function main() {
  const session = await connectToDatabase()
  runServer(session)
}

main().catch(console.error)
