import koaCors from "@koa/cors"
import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"
import neo4j from "neo4j-driver"

import { databasePass, databaseUrl, databaseUser, port } from "./env"
import { createHash } from "./helpers/secure-password"

function runServer(session: neo4j.Session) {
  const app = new Koa()

  app.use(koaLogger())
  app.use(koaBody())
  app.use(koaCors())

  app.use(handleRegisterRoute(session))

  app.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}

function handleRegisterRoute(session: neo4j.Session): Koa.Middleware {
  return async (ctx, next) => {
    if (ctx.path !== "/register") {
      return next()
    }

    const newUserData = ctx.request.body

    if (await userExists(session, newUserData.username, newUserData.email)) {
      ctx.body = { error: "User already exists" }
      return
    }

    await createUser(session, newUserData)

    ctx.body = {}
  }
}

function connectToDatabase(): Promise<neo4j.Session> {
  return new Promise((resolve, reject) => {
    const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))

    driver.onError = message => {
      console.error("Error connecting to database:", message)
      reject(message)
    }

    driver.onCompleted = () => {
      resolve(driver.session())
    }
  })
}

async function userExists(session: neo4j.Session, username: string, email: string) {
  const userExistsQuery = `
    match (u:User)
    where u.username = {username} or u.email = {email}
    return properties(u) as user
  `

  const { records } = await session.run(userExistsQuery, { username, email })
  return records.length > 0
}

async function createUser(session: neo4j.Session, newUserData: any) {
  const { username, email, password, displayName } = newUserData

  const passwordHash = await createHash(Buffer.from(password))

  const details = { username, email, displayName, password: passwordHash.toString() }
  const newAccountQuery = `create (:User $details)`
  await session.run(newAccountQuery, { details })
}

async function main() {
  const session = await connectToDatabase()
  runServer(session)
}

main().catch(console.error)
