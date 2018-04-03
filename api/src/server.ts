import koaCors from "@koa/cors"
import Koa from "koa"
import koaBody from "koa-body"
import koaLogger from "koa-logger"
import Router from "koa-router"
import neo4j from "neo4j-driver"

import { handleInternalErrors } from "./common/middleware/handle-internal-errors.middleware"
import { port } from "./env"
import { loginRoute } from "./user/routes/login.route"
import { logoutRoute } from "./user/routes/logout.route"
import { registerRoute } from "./user/routes/register.route"
import { unregisterRoute } from "./user/routes/unregister.route"
import { UserService } from "./user/user.service"

export function runServer(session: neo4j.Session) {
  const app = new Koa()

  const userService = new UserService(session)

  const router = new Router()
  router.post("/login", loginRoute(userService))
  router.post("/logout", logoutRoute(userService))
  router.post("/register", registerRoute(userService))
  router.post("/unregister", unregisterRoute(userService))
  // router.get("/user", checkAuth(), sendUserData())

  app.use(handleInternalErrors())
  app.use(koaLogger())
  app.use(koaBody())
  app.use(koaCors())

  app.use(router.routes())

  app.listen(port, () => {
    console.info(`listening on http://localhost:${port}`)
  })
}
