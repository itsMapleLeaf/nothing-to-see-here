import { string } from "joi"
import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { emptyResponse } from "../../common/middleware/empty-response.middleware"
import { validateBody } from "../../common/middleware/validate-body.middleware"
import { UserService } from "../user.service"

const logoutDtoSchema = {
  username: string().required(),
}

function clearUserToken(users: UserService): Middleware<Context> {
  return async (ctx, next) => {
    await users.clearToken(ctx.body.username)
    await next()
  }
}

export function logoutRoute(users: UserService): Middleware<Context> {
  return compose([validateBody(logoutDtoSchema), clearUserToken(users), emptyResponse()])
}
