import { Schema, string } from "joi"
import Koa from "koa"
import compose from "koa-compose"

import { validateBody } from "./middleware/validate-body"
import { UserService } from "./user.service"

interface RegisterDto {
  username: string
  email: string
  password: string
  displayName: string
}

const registerDtoSchema: Record<keyof RegisterDto, Schema> = {
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

function checkUserExistence(users: UserService): Koa.Middleware {
  return async (ctx, next) => {
    const { username, email } = ctx.request.body as RegisterDto
    if (await users.userExists(username, email)) {
      ctx.body = { error: "User already exists" }
      return
    }
    await next()
  }
}

function createUser(users: UserService): Koa.Middleware {
  return async (ctx, next) => {
    const newUserData = ctx.request.body as RegisterDto
    ctx.state.user = await users.createUser(newUserData)
    await next()
  }
}

function createUserToken(users: UserService): Koa.Middleware {
  return async (ctx, next) => {
    const token = await users.createToken(ctx.request.body.username)
    ctx.state.user = { ...ctx.state.user, token }
    await next()
  }
}

function sendUserToken(): Koa.Middleware {
  return async (ctx, next) => {
    ctx.body = { token: ctx.state.user.token }
    await next()
  }
}

export function handleRegisterRoute(users: UserService): Koa.Middleware {
  return compose([
    validateBody(registerDtoSchema),
    checkUserExistence(users),
    createUser(users),
    createUserToken(users),
    sendUserToken(),
  ])
}
