import Koa, { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { validateBody } from "../middleware/validate-body"
import { NewUserData, newUserDataSchema } from "./new-user-data.interface"
import { User } from "./user.interface"
import { UserService } from "./user.service"

interface UserContext extends Context {
  state: {
    user?: User
  }
}

function checkUserExistence(users: UserService): Middleware<Context> {
  return async (ctx, next) => {
    const { username, email } = ctx.request.body as NewUserData
    if (await users.userExists(username, email)) {
      ctx.body = { error: "User already exists" }
      return
    }
    await next()
  }
}

function createUser(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const newUserData = ctx.request.body as NewUserData
    ctx.state.user = await users.createUser(newUserData)
    await next()
  }
}

function createUserToken(users: UserService): Middleware<UserContext> {
  return async (ctx, next) => {
    const { user } = ctx.state
    if (user) {
      const token = await users.createToken(user.username)
      user.token = token
    }
    await next()
  }
}

function sendUserToken(): Middleware<UserContext> {
  return async (ctx, next) => {
    if (ctx.state.user) {
      ctx.body = { token: ctx.state.user.token }
    }
    await next()
  }
}

export function handleRegisterRoute(users: UserService): Koa.Middleware {
  return compose([
    validateBody(newUserDataSchema),
    checkUserExistence(users),
    createUser(users),
    createUserToken(users),
    sendUserToken(),
  ])
}
