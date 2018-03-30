import { Context } from "koa"
import { Middleware } from "koa-compose"

export function emptyResponse(): Middleware<Context> {
  return async (ctx, next) => {
    ctx.body = {}
    await next()
  }
}
