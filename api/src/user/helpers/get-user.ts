import { HttpException } from "../../common/http-exception"
import { UserService } from "../user.service"

export async function getUser(users: UserService, username: string) {
  const user = await users.getUserByUsername(username)
  if (!user) {
    throw new HttpException("User not found", 404)
  }
  return user
}
