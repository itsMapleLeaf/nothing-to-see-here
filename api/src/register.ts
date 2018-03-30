import { Schema, string, validate } from "joi"
import Koa from "koa"

import { UserService } from "./user.service"

export interface RegisterDto {
  username: string
  email: string
  password: string
  displayName: string
}

export const registerDtoSchema: Record<keyof RegisterDto, Schema> = {
  username: string()
    .required()
    .min(3)
    .regex(/^[a-z0-9-_]+$/i),

  email: string()
    .required()
    .email(),

  password: string()
    .required()
    .min(8),

  displayName: string()
    .required()
    .min(3),
}

export function handleRegisterRoute(users: UserService): Koa.Middleware {
  return async (ctx, next) => {
    if (ctx.path !== "/register") {
      return next()
    }

    const validationResult = validate<RegisterDto>(ctx.request.body, registerDtoSchema)
    if (validationResult.error) {
      ctx.body = { error: `Invalid body: ${validationResult.error.details[0].message}` }
      return
    }

    const newUserData = validationResult.value

    if (await users.userExists(newUserData.username, newUserData.email)) {
      ctx.body = { error: "User already exists" }
      return
    }

    await users.createUser(newUserData)

    const token = await users.createToken(newUserData.username)

    ctx.body = { token }
  }
}
