import { Context } from "koa"
import compose, { Middleware } from "koa-compose"
import passport from "koa-passport"

import { loginDtoSchema } from "../../../../shared/user/types/login-dto"
import { validateBody } from "../../common/middleware/validate-body.middleware"
import { sendUserData } from "../middleware/send-user-data.middleware"
import { UserContext } from "../types/user-context.interface"
import { UserService } from "../user.service"

function authenticate(): Middleware<UserContext> {
  return async (ctx, next) => {
    return passport.authenticate("local", async (_, user) => {
      if (!user) {
        ctx.body = { error: "Invalid username, email, or password" }
        ctx.status = 401
        return
      }

      await ctx.login(user)
      await next()
    })(ctx, next)
  }
}

export function loginRoute(users: UserService): Middleware<Context> {
  return compose([validateBody(loginDtoSchema), authenticate(), sendUserData()])
}
