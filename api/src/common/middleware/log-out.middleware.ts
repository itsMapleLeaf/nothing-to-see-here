import { Context } from "koa"
import { Middleware } from "koa-compose"

export function logOut(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.logout()
    await next()
  }
}
