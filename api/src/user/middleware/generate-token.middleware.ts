import { Middleware } from "koa-compose"

import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

export function generateUserToken(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const { user } = ctx.state
    if (!user) {
      ctx.status = 401
      ctx.body = "Not logged in"
      return
    }

    user.token = await users.generateToken(user.username)
    await next()
  }
}
