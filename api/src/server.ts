import koaCors from "@koa/cors"
import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"
import passport from "koa-passport"
import Router from "koa-router"
import koaSession from "koa-session"
import neo4j from "neo4j-driver"

import { handleInternalErrors } from "./common/middleware/handle-internal-errors.middleware"
import { apiSessionSecret, port } from "./env"
import { configurePassport, safePassportSession } from "./passport"
import { loginRoute } from "./user/routes/login.route"
import { logoutRoute } from "./user/routes/logout.route"
import { registerRoute } from "./user/routes/register.route"
import { UserService } from "./user/user.service"

export function runServer(session: neo4j.Session) {
  const app = new Koa()

  const userService = new UserService(session)

  configurePassport(userService)

  const router = new Router()
  router.post("/register", registerRoute(userService))
  router.post("/login", loginRoute(userService))
  router.post("/logout", logoutRoute(userService))

  app.keys = [apiSessionSecret]

  app.use(handleInternalErrors())
  app.use(koaLogger())
  app.use(koaBody())
  app.use(koaCors())
  app.use(koaSession({}, app))

  app.use(passport.initialize())
  app.use(safePassportSession())

  app.use(router.routes())

  app.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}
