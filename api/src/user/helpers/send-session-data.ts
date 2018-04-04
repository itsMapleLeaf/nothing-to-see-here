import Koa from "koa"

import { User } from "../types/user.interface"

export function sendSessionData(user: User, ctx: Koa.Context) {
  const { username, displayName, token } = user
  ctx.body = { username, displayName, token }
}
