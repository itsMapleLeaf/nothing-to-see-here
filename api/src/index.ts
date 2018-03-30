import koaCors from "@koa/cors"
import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"
import Router from "koa-router"
import neo4j from "neo4j-driver"

import { databasePass, databaseUrl, databaseUser, port } from "./env"
import { handleInternalErrors } from "./middleware/handle-internal-errors"
import { handleRegisterRoute } from "./register"
import { UserService } from "./user.service"

function runServer(session: neo4j.Session) {
  return new Promise((resolve, reject) => {
    const app = new Koa()
    const userService = new UserService(session)
    const router = new Router()

    router.post("/register", handleRegisterRoute(userService))

    app.use(handleInternalErrors())
    app.use(koaLogger())
    app.use(koaBody())
    app.use(koaCors())

    app.use(router.routes())

    app.listen(port, () => {
      console.info(`listening on http://localhost:${port}`)
      resolve()
    })
  })
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

async function main() {
  const session = await connectToDatabase()
  await runServer(session)
}

main().catch(console.error)
