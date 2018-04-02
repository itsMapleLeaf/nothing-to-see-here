import { Context } from "koa"
import { Middleware } from "koa-compose"

export function checkAuth(): Middleware<Context> {
  return async (ctx, next) => {
    if (ctx.isUnauthenticated()) {
      ctx.status = 401
      ctx.body = { error: "Unauthorized, please log in" }
      return
    }
    await next()
  }
}
