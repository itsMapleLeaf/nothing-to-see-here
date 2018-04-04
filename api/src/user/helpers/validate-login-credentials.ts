import { LoginCredentials } from "../../../../shared/user/types/login-credentials"
import { HttpException } from "../../common/http-exception"
import { User } from "../types/user.interface"
import { UserService } from "../user.service"

export async function validateLoginCredentials(
  users: UserService,
  credentials: LoginCredentials,
): Promise<User> {
  const user = await users.getUserByUsernameOrEmail(credentials.usernameOrEmail)
  if (!user) {
    throw new HttpException("Invalid username, email, or password", 401)
  }
  if (!await users.isPasswordValid(user.username, credentials.password)) {
    throw new HttpException("Invalid username, email, or password", 401)
  }
  return user
}
