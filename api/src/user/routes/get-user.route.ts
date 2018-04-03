import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { sendUserData } from "../middleware/send-user-data.middleware"
import { UserService } from "../user.service"

export function getUser(users: UserService): Middleware<Context> {
  return sendUserData()
}
