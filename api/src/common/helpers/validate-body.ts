import { SchemaLike, validate } from "joi"
import { Context } from "koa"

import { HttpException } from "../http-exception"

export function validateBody<T>(ctx: Context, schema: SchemaLike): T {
  const validationResult = validate(ctx.request.body, schema)
  if (validationResult.error) {
    throw new HttpException(`Invalid body: ${validationResult.error.details[0].message}`, 400)
  }
  return ctx.request.body
}
