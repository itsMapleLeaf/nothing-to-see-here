import { Context } from "koa"
import compose, { Middleware } from "koa-compose"

import { UserService } from "../user.service"

// TODO?
export function getUser(users: UserService): Middleware<Context> {
  return compose([
    // validateTokenCredentials(users),
  ])
}
