import { SchemaLike, validate } from "joi"
import Koa from "koa"

export function validateBody(schema: SchemaLike): Koa.Middleware {
  return async (ctx, next) => {
    const validationResult = validate(ctx.request.body, schema)
    if (validationResult.error) {
      ctx.body = { error: `Invalid body: ${validationResult.error.details[0].message}` }
      return
    }
    await next()
  }
}
