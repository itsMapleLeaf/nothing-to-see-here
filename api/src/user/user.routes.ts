import { Context } from "koa"
import Router from "koa-router"

import { endpoints } from "../../../shared/constants/api-endpoints"
import {
  LoginCredentials,
  loginCredentialsSchema,
} from "../../../shared/user/types/login-credentials"
import { NewUserData, newUserDataSchema } from "../../../shared/user/types/new-user-data"
import { validateBody } from "../common/helpers/validate-body"
import { HttpException } from "../common/http-exception"
import { getUser } from "./helpers/get-user"
import { sendSessionData } from "./helpers/send-session-data"
import { validateLoginCredentials } from "./helpers/validate-login-credentials"
import { validateTokenCredentials } from "./helpers/validate-token-credentials"
import { UserService } from "./user.service"

export function userRoutes(users: UserService) {
  const router = new Router()

  router.post(endpoints.login, async (ctx: Context) => {
    const credentials = validateBody<LoginCredentials>(ctx, loginCredentialsSchema)
    const user = await validateLoginCredentials(users, credentials)
    user.token = await users.generateToken(user.username)
    sendSessionData(user, ctx)
  })

  router.post(endpoints.logout, async (ctx: Context) => {
    await users.clearToken(ctx.request.body.username)
    ctx.body = {}
  })

  router.post(endpoints.register, async (ctx: Context) => {
    const newUserData = validateBody<NewUserData>(ctx, newUserDataSchema)

    if (await users.userExists(newUserData.username, newUserData.email)) {
      throw new HttpException("User already exists", 400)
    }

    const user = await users.createUser(newUserData)
    user.token = await users.generateToken(user.username)
    sendSessionData(user, ctx)
  })

  router.post(endpoints.unregister, async (ctx: Context) => {
    const credentials = validateBody<LoginCredentials>(ctx, loginCredentialsSchema)
    const user = await validateLoginCredentials(users, credentials)
    await users.removeUser(user.username)
    ctx.body = {}
  })

  router.post(endpoints.checkToken, async (ctx: Context) => {
    const user = await validateTokenCredentials(ctx, users)
    sendSessionData(user, ctx)
  })

  router.get(endpoints.user(":username"), async (ctx: Context) => {
    const username = ctx.params.username as string
    const user = await getUser(users, username)
    const { displayName } = user
    ctx.body = { username, displayName }
  })

  return router.routes()
}
