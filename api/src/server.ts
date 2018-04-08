import koaCors from "@koa/cors"
import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"

import { authRoutes } from "./auth/auth.routes"
import { characterRoutes } from "./character/character.routes"
import { port } from "./env"

export function runServer() {
  const app = new Koa()

  app.use(errorHandler())
  app.use(koaLogger())
  app.use(koaBody())
  app.use(koaCors())
  app.use(authRoutes())
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
      console.error(error)
    }
  }
}
