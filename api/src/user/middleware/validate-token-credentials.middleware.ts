import { Middleware } from "koa-compose"

import { TokenCredentials } from "../../../../shared/user/types/token-credentials"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

export function validateTokenCredentials(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const credentials = ctx.request.body as TokenCredentials
    if (!await users.isTokenValid(credentials.username, credentials.token)) {
      ctx.body = { error: "Invalid or expired token" }
      ctx.status = 401
      return
    }

    ctx.state.user = await users.getUserByUsername(credentials.username)
    await next()
  }
}
