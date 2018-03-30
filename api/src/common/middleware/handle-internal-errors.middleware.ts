import Koa from "koa"

export function handleInternalErrors(): Koa.Middleware {
  return async (ctx, next) => {
    try {
      await next()
    } catch (error) {
      ctx.status = error.status || 500
      ctx.body = { error: error.message || "Internal server error" }
      console.error("Server error:", error)
    }
  }
}
