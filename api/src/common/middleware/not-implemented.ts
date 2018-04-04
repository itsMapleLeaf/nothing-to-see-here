import { Middleware } from "koa"

import { HttpException } from "../http-exception"

export function notImplemented(): Middleware {
  return async (ctx, next) => {
    throw new HttpException("not implemented", 501)
  }
}
