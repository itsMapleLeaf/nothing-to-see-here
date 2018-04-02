import Koa, { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { NewUserData, newUserDataSchema } from "../../../../shared/user/types/new-user-data"
import { validateBody } from "../../common/middleware/validate-body.middleware"
import { createUserToken } from "../middleware/create-user-token.middleware"
import { sendUserData } from "../middleware/send-user-data.middleware"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

function checkUserExistence(users: UserService): Middleware<Context> {
  return async (ctx, next) => {
    const { username, email } = ctx.request.body as NewUserData
    if (await users.userExists(username, email)) {
      ctx.body = { error: "User already exists" }
      return
    }
    await next()
  }
}

function createUser(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const newUserData = ctx.request.body as NewUserData
    ctx.state.user = await users.createUser(newUserData)
    await next()
  }
}

export function registerRoute(users: UserService): Koa.Middleware {
  return compose([
    validateBody(newUserDataSchema),
    checkUserExistence(users),
    createUser(users),
    createUserToken(users),
    sendUserData(),
  ])
}
