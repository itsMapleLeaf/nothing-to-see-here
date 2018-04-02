import { Middleware } from "koa-compose"
import { ClientUserData } from "../../../../shared/user/types/client-user-data"
import { UserContext } from "../types/user-context.interface"

export function sendUserData(): Middleware<UserContext> {
  return async (ctx, next) => {
    if (ctx.state.user) {
      const { username, displayName, token } = ctx.state.user
      ctx.body = { username, displayName, token } as ClientUserData
    }
    await next()
  }
}
