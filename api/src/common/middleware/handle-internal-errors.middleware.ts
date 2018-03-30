import Koa from "koa"

export function handleInternalErrors(): Koa.Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.status = 500
      ctx.body = { error: "Internal server error" }
      console.error("Interal error:", error)
    }
  }
}
