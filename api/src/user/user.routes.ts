import { Middleware } from "koa"
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

function loginRoute(users: UserService): Middleware {
  return async (ctx, next) => {
    const credentials = validateBody<LoginCredentials>(ctx, loginCredentialsSchema)
    const user = await validateLoginCredentials(users, credentials)
    user.token = await users.generateToken(user.username)
    sendSessionData(user, ctx)
  }
}

function logoutRoute(users: UserService): Middleware {
  return async (ctx, next) => {
    await users.clearToken(ctx.request.body.username)
    ctx.body = {}
  }
}

function registerRoute(users: UserService): Middleware {
  return async (ctx, next) => {
    const newUserData = validateBody<NewUserData>(ctx, newUserDataSchema)

    if (await users.userExists(newUserData.username, newUserData.email)) {
      throw new HttpException("User already exists", 400)
    }

    const user = await users.createUser(newUserData)
    user.token = await users.generateToken(user.username)
    sendSessionData(user, ctx)
  }
}

function unregisterRoute(users: UserService): Middleware {
  return async (ctx, next) => {
    const credentials = validateBody<LoginCredentials>(ctx, loginCredentialsSchema)
    const user = await validateLoginCredentials(users, credentials)
    await users.removeUser(user.username)
    ctx.body = {}
  }
}

function checkTokenRoute(users: UserService): Middleware {
  return async (ctx, next) => {
    const user = await validateTokenCredentials(ctx, users)
    sendSessionData(user, ctx)
  }
}

function getUserRoute(users: UserService): Middleware {
  return async (ctx, next) => {
    const username = ctx.params.username as string
    const user = await getUser(users, username)
    const { displayName } = user
    ctx.body = { username, displayName }
  }
}

export function userRoutes(userService: UserService) {
  const router = new Router()

  router.post(endpoints.login, loginRoute(userService))
  router.post(endpoints.logout, logoutRoute(userService))
  router.post(endpoints.register, registerRoute(userService))
  router.post(endpoints.unregister, unregisterRoute(userService))
  router.post(endpoints.checkToken, checkTokenRoute(userService))
  router.get(endpoints.user(":username"), getUserRoute(userService))

  return router.routes()
}
