import { Schema, string } from "joi"
import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { validateBody } from "../../common/middleware/validate-body.middleware"
import { createUserToken } from "../middleware/create-user-token.middleware"
import { sendUserToken } from "../middleware/send-user-token.middleware"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

interface LoginDto {
  usernameOrEmail: string
  password: string
}

const loginDtoSchema: Record<keyof LoginDto, Schema> = {
  usernameOrEmail: string().required(),
  password: string().required(),
}

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
    sendUserToken(),
  ])
}
