import { Controller, HttpCode, HttpException, HttpStatus, Post, Req } from "@nestjs/common"
import { Request } from "express"
import securePassword from "secure-password"

import { DatabaseService } from "./database.service"
import { validateRequestBody } from "./helpers/http"
import { verifyHash } from "./helpers/secure-password"
import { LoginDetails } from "./login-details.model"
import { NewUserDetails } from "./new-user-details.model"

type LoginResponseData = { token: string }

type RegisterResponseData = { token: string }

const HTTP_ERROR_BAD_LOGIN = "Invalid email, username, or password"
const HTTP_ERROR_USERNAME_TAKEN = "Username is taken"
const HTTP_ERROR_EMAIL_TAKEN = "Email is taken"

@Controller()
export class AuthController {
  constructor(private database: DatabaseService) {}

  @Post("login")
  async login(@Req() request: Request): Promise<LoginResponseData> {
    const { usernameOrEmail, password } = await validateRequestBody(
      new LoginDetails(),
      request.body,
    )

    const user = await this.database.getUserByUsernameOrEmail(usernameOrEmail)
    if (!user) {
      throw new HttpException(HTTP_ERROR_BAD_LOGIN, HttpStatus.BAD_REQUEST)
    }

    const verifyResult = await verifyHash(Buffer.from(password), Buffer.from(user.password))
    switch (verifyResult) {
      case securePassword.VALID:
        break

      case securePassword.VALID_NEEDS_REHASH:
        await this.database.rehashPassword(user.username, user.password)
        break

      case securePassword.INVALID:
        throw new HttpException(HTTP_ERROR_BAD_LOGIN, HttpStatus.BAD_REQUEST)

      case securePassword.INVALID_UNRECOGNIZED_HASH:
        console.error("Internal error: unrecognized hash")
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)

      default:
        console.error("Internal error: unknown verification result")
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const token = await this.database.createToken(user.username)
    return { token }
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Req() request: Request): Promise<RegisterResponseData> {
    const newUserDetails = await validateRequestBody(new NewUserDetails(), request.body)

    const [usernameTaken, emailTaken] = await Promise.all([
      this.database.usernameTaken(newUserDetails.username),
      this.database.emailTaken(newUserDetails.email),
    ])

    if (usernameTaken) throw new HttpException(HTTP_ERROR_USERNAME_TAKEN, HttpStatus.BAD_REQUEST)
    if (emailTaken) throw new HttpException(HTTP_ERROR_EMAIL_TAKEN, HttpStatus.BAD_REQUEST)

    await this.database.createAccount(newUserDetails)

    const token = await this.database.createToken(newUserDetails.username)
    return { token }
  }
}
