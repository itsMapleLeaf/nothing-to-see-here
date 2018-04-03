import Koa from "koa"
import compose, { Middleware } from "koa-compose"

import { emptyResponse } from "../../common/middleware/empty-response.middleware"
import { validateLoginCredentials } from "../middleware/validate-login-credentials"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

function removeUser(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const { user } = ctx.state
    if (user) {
      await users.removeUser(user.username)
    }
    ctx.state.user = undefined
    await next()
  }
}

export function unregisterRoute(users: UserService): Koa.Middleware {
  return compose([validateLoginCredentials(users), removeUser(users), emptyResponse()])
}
