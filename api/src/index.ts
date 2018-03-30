import koaCors from "@koa/cors"
import { SchemaLike, validate } from "joi"
import Koa from "koa"
import koaBody from "koa-body"
import compose from "koa-compose"
import koaLogger from "koa-logger"
import neo4j from "neo4j-driver"

import { databasePass, databaseUrl, databaseUser, port } from "./env"
import { handleRegisterRoute, registerDtoSchema } from "./register"
import { UserService } from "./user.service"

function runServer(session: neo4j.Session) {
  return new Promise((resolve, reject) => {
    const app = new Koa()
    const userService = new UserService(session)

    app.use(internalErrorHandler())
    app.use(koaLogger())
    app.use(koaBody())
    app.use(koaCors())

    app.use(compose([validateBody(registerDtoSchema), handleRegisterRoute(userService)]))

    app.listen(port, () => {
      console.info(`listening on http://localhost:${port}`)
      resolve()
    })
  })
}

function internalErrorHandler(): Koa.Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: "Internal server error" }
      console.error("Interal error:", error)
    }
  }
}

function validateBody(schema: SchemaLike): Koa.Middleware {
  return async (ctx, next) => {
    const validationResult = validate(ctx.request.body, schema)
    if (validationResult.error) {
      ctx.body = { error: `Invalid body: ${validationResult.error.details[0].message}` }
      return
    }
    await next()
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

async function main() {
  const session = await connectToDatabase()
  await runServer(session)
}

main().catch(console.error)
