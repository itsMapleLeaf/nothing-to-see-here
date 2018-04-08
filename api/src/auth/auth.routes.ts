import { Context } from "koa"
import Router from "koa-router"

import { endpoints } from "../../../shared/constants/api-endpoints"
import { LoginCredentials } from "../../../shared/user/types/login-credentials"
import { NewUserData } from "../../../shared/user/types/new-user-data"
import { TokenCredentials } from "../../../shared/user/types/token-credentials"
import { createHash } from "../common/helpers/create-hash"
import { randomBytesPromise } from "../common/helpers/random-bytes-promise"
import { HttpException } from "../common/http-exception"
import { UserModel } from "../user/user.model"

export function authRoutes() {
  const router = new Router()

  router.post(endpoints.login, async (ctx: Context) => {
    const credentials = ctx.request.body as LoginCredentials

    const user = await validateLoginCredentials(credentials)
    await user.generateToken()
    await user.save()

    const { name, displayName, token } = user
    ctx.body = { token, name, displayName }
  })

  router.post(endpoints.logout, async (ctx: Context) => {
    const user = await UserModel.findOne({ name: ctx.request.body.name })
    if (!user) return

    await user.clearToken()
    await user.save()

    ctx.body = {}
  })

  router.post(endpoints.register, async (ctx: Context) => {
    const newUserData = ctx.request.body as NewUserData
    const { name, displayName, email, password } = newUserData

    const existingUser = await UserModel.findOne().or([{ name }, { email }])
    if (existingUser) {
      const errorMsg =
        existingUser.email === email ? "Email already registered" : "Name already taken"

      throw new HttpException(errorMsg, 400)
    }

    const salt = (await randomBytesPromise(16)).toString()
    const passwordHash = await createHash(password, salt)

    const user = await UserModel.create({ name, displayName, email, passwordHash, salt })
    await user.generateToken()
    await user.save()

    ctx.body = { token: user.token }
  })

  router.post(endpoints.unregister, async (ctx: Context) => {
    const credentials = ctx.request.body as LoginCredentials

    const user = await validateLoginCredentials(credentials)
    await user.remove()

    ctx.body = {}
  })

  router.post(endpoints.authUser, async (ctx: Context) => {
    const credentials = ctx.request.headers as TokenCredentials

    const user = await UserModel.findOne({ name: credentials.name })
    if (user == null || !user.isTokenValid(credentials.token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const { name, displayName, token } = user
    ctx.body = { token, name, displayName }
  })

  return router.routes()
}

async function validateLoginCredentials(credentials: LoginCredentials) {
  const user = await UserModel.findOne().or([
    { name: credentials.nameOrEmail },
    { email: credentials.nameOrEmail },
  ])

  if (!user) {
    throw new HttpException("Invalid username, email, or password", 401)
  }

  const passwordHash = await createHash(credentials.password, user.salt)
  if (user.passwordHash !== passwordHash) {
    throw new HttpException("Invalid username, email, or password", 401)
  }

  return user
}
