import koaCors from "@koa/cors"
import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"
import neo4j from "neo4j-driver"

import { characterRoutes } from "./character/character.routes"
import { port } from "./env"
import { userRoutes } from "./user/user.routes"
import { UserService } from "./user/user.service"

export function runServer(session: neo4j.Session) {
  const app = new Koa()

  app.use(errorHandler())
  app.use(koaLogger())
  app.use(koaBody())
  app.use(koaCors())
  app.use(userRoutes(new UserService(session)))
  app.use(characterRoutes())

  app.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}

function errorHandler(): Koa.Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.status = error.status || 500
      ctx.body = { error: error.message || "Internal server error" }
    }
  }
}
