import { Middleware } from "koa-compose"

import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

export function createUserToken(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const { user } = ctx.state
    if (user) {
      const token = await users.createToken(user.username)
      user.token = token
    }
    await next()
  }
}
