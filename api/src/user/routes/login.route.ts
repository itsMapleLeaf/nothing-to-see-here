import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { loginDtoSchema } from "../../../../shared/user/types/login-dto"
import { validateBody } from "../../common/middleware/validate-body.middleware"
import { generateUserToken } from "../middleware/generate-token.middleware"
import { sendUserIdentity } from "../middleware/send-user-data.middleware"
import { sendUserToken } from "../middleware/send-user-token.middleware"
import { validateLoginCredentials } from "../middleware/validate-login-credentials"
import { UserService } from "../user.service"

export function loginRoute(users: UserService): Middleware<Context> {
  return compose([
    validateBody(loginDtoSchema),
    validateLoginCredentials(users),
    generateUserToken(users),
    sendUserIdentity(),
    sendUserToken(),
  ])
}
