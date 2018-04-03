import { Middleware } from "koa-compose"

import { LoginDto } from "../../../../shared/user/types/login-dto"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

export function validateLoginCredentials(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const { usernameOrEmail, password } = ctx.request.body as LoginDto
    const passwordValid = await users.isPasswordValid(usernameOrEmail, password)
    if (!passwordValid) {
      ctx.status = 401
      ctx.body = "Invalid username, email, or password"
      return
    }

    ctx.state.user = await users.getUserByUsernameOrEmail(usernameOrEmail)
    await next()
  }
}
