import { Middleware } from "koa-compose"

import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

export function clearToken(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    await users.clearToken(ctx.request.body.username)
    await next()
  }
}
