import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { sendUserIdentity } from "../middleware/send-user-data.middleware"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

function getUserByUsername(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const user = await users.getUserByUsername(ctx.params.username)
    if (!user) {
      ctx.body = { error: "Could not find user" }
      ctx.status = 404
      return
    }

    ctx.state.user = user
    await next()
  }
}

// TODO?
export function getUserRoute(users: UserService): Middleware<Context> {
  return compose([getUserByUsername(users), sendUserIdentity()])
}
