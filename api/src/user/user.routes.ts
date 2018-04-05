import { pbkdf2 } from "crypto"
import { Context } from "koa"
import Router from "koa-router"
import { promisify } from "util"

import { endpoints } from "../../../shared/constants/api-endpoints"
import {
  LoginCredentials,
  loginCredentialsSchema,
} from "../../../shared/user/types/login-credentials"
import { NewUserData, newUserDataSchema } from "../../../shared/user/types/new-user-data"
import { TokenCredentials } from "../../../shared/user/types/token-credentials"
import { randomBytesPromise } from "../common/helpers/random-bytes-promise"
import { validateBody } from "../common/helpers/validate-body"
import { HttpException } from "../common/http-exception"
import { UserModel } from "./user.model"

const pbkdf2Promise = promisify(pbkdf2)

export function userRoutes() {
  const router = new Router()

  router.post(endpoints.login, async (ctx: Context) => {
    const credentials = validateBody<LoginCredentials>(ctx, loginCredentialsSchema)

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
    const newUserData = validateBody<NewUserData>(ctx, newUserDataSchema)
    const { name, displayName, email, password } = newUserData

    const existingUser = await UserModel.findOne().or([{ name }, { email }])
    if (existingUser) {
      const errorMsg =
        existingUser.email === email ? "Email already registered" : "Name already taken"

      throw new HttpException(errorMsg, 400)
    }

    const salt = (await randomBytesPromise(16)).toString()
    const passwordHash = await createPasswordHash(password, salt)

    const user = await UserModel.create({ name, displayName, email, passwordHash, salt })
    await user.generateToken()
    await user.save()

    ctx.body = { token: user.token }
  })

  router.post(endpoints.unregister, async (ctx: Context) => {
    const credentials = validateBody<LoginCredentials>(ctx, loginCredentialsSchema)

    const user = await validateLoginCredentials(credentials)
    await user.remove()

    ctx.body = {}
  })

  router.post(endpoints.checkToken, async (ctx: Context) => {
    const credentials = ctx.request.body as TokenCredentials

    const user = await UserModel.findOne({ name: credentials.name })
    if (user == null || !user.isTokenValid(credentials.token)) {
      throw new HttpException("Invalid or expired token", 401)
    }

    const { name, displayName, token } = user
    ctx.body = { token, name, displayName }
  })

  router.get(endpoints.user(":name"), async (ctx: Context) => {
    const user = await UserModel.findOne({ name: ctx.params.name })
    if (!user) {
      throw new HttpException("User not found", 404)
    }

    const { name, displayName } = user
    ctx.body = { name, displayName }
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

  const passwordHash = await createPasswordHash(credentials.password, user.salt)
  if (user.passwordHash !== passwordHash) {
    throw new HttpException("Invalid username, email, or password", 401)
  }

  return user
}

async function createPasswordHash(password: string, salt: string) {
  const buffer = await pbkdf2Promise(password, salt, 100000, 64, "sha512")
  return buffer.toString("hex")
}
