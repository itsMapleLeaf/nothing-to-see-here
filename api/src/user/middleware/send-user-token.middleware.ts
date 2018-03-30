import { Middleware } from "koa-compose"

import { UserContext } from "../types/user-context.interface"

export function sendUserToken(): Middleware<UserContext> {
  return async (ctx, next) => {
    if (ctx.state.user) {
      ctx.body = { token: ctx.state.user.token }
    }
    await next()
  }
}
