import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { LoginDto, loginDtoSchema } from "../../../../shared/user/types/login-dto"
import { validateBody } from "../../common/middleware/validate-body.middleware"
import { createUserToken } from "../middleware/create-user-token.middleware"
import { sendUserData } from "../middleware/send-user-data.middleware"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

function validateCredentials(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const { usernameOrEmail, password } = ctx.request.body as LoginDto
    const user = await users.getUserByUsernameOrEmail(usernameOrEmail)
    if (!user) {
      ctx.body = { error: "Invalid email or password" }
      return
    }

    if (!await users.isPasswordValid(user.username, password)) {
      ctx.body = { error: "Invalid email or password" }
      return
    }

    ctx.state.user = user
    await next()
  }
}

export function loginRoute(users: UserService): Middleware<Context> {
  return compose([
    validateBody(loginDtoSchema),
    validateCredentials(users),
    createUserToken(users),
    sendUserData(),
  ])
}
