import Koa from "koa"

import { TokenCredentials } from "../../../../shared/user/types/token-credentials"
import { HttpException } from "../../common/http-exception"
import { UserService } from "../user.service"

export async function validateTokenCredentials(ctx: Koa.Context, users: UserService) {
  const credentials = ctx.request.body as TokenCredentials
  const user = await users.getUserByUsername(credentials.username)
  if (!user) {
    throw new HttpException("User not found", 404)
  }
  if (!await users.isTokenValid(credentials.username, credentials.token)) {
    throw new HttpException("Invalid or expired token", 401)
  }
  return user
}
