import { Middleware } from "koa-compose"

import { UserContext } from "../types/user-context.interface"

export function sendUserToken(): Middleware<UserContext> {
  return async (ctx, next) => {
    const { user } = ctx.state
    if (!user || !user.token) {
      ctx.body = { error: "Not logged in" }
      ctx.status = 401
      return
    }
    ctx.body = { ...ctx.body, token: user.token }
    await next()
  }
}
