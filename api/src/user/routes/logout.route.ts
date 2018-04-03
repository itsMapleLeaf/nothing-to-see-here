import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { emptyResponse } from "../../common/middleware/empty-response.middleware"
import { clearToken } from "../middleware/clear-token.middleware"
import { UserService } from "../user.service"

export function logoutRoute(users: UserService): Middleware<Context> {
  return compose([clearToken(users), emptyResponse()])
}
