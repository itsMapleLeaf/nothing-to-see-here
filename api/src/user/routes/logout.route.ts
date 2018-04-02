import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { emptyResponse } from "../../common/middleware/empty-response.middleware"
import { UserService } from "../user.service"

function logOut(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.logout()
    await next()
  }
}

export function logoutRoute(users: UserService): Middleware<Context> {
  return compose([logOut(), emptyResponse()])
}
