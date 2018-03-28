import { Controller, HttpException, HttpStatus, Post, Req } from "@nestjs/common"
import { Request } from "express"
import securePassword from "secure-password"

import { DatabaseService } from "./database.service"
import { verifyHash } from "./helpers/secure-password"
import { NewUserDetails } from "./new-user-details.model"

type LoginRequestBody = {
  usernameOrEmail: string
  password: string
}

type LoginResponseData = {}

type RegisterRequestBody = NewUserDetails

type RegisterResponseData = {}

const HTTP_ERROR_BAD_LOGIN = "Invalid email, username, or password"
const HTTP_ERROR_USERNAME_TAKEN = "Username is taken"
const HTTP_ERROR_EMAIL_TAKEN = "Email is taken"

@Controller()
export class AuthController {
  constructor(private database: DatabaseService) {}

  @Post("login")
  async login(@Req() request: Request): Promise<LoginResponseData> {
    const { usernameOrEmail, password } = request.body as LoginRequestBody

    const user = await this.database.getUserByUsernameOrEmail(usernameOrEmail)

    if (!user) {
      throw new HttpException(HTTP_ERROR_BAD_LOGIN, HttpStatus.BAD_REQUEST)
    }

    const verifyResult = await verifyHash(Buffer.from(password), Buffer.from(user.password))

    switch (verifyResult) {
      case securePassword.VALID:
        break

      case securePassword.VALID_NEEDS_REHASH:
        this.database.rehashPassword(user.username, user.password)
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

    return {}
  }

  @Post("register")
  async createAccount(@Req() request: Request): Promise<RegisterResponseData> {
    const body = request.body as RegisterRequestBody

    if (await this.database.usernameTaken(body.username)) {
      throw new HttpException(HTTP_ERROR_USERNAME_TAKEN, HttpStatus.BAD_REQUEST)
    }

    if (await this.database.emailTaken(body.email)) {
      throw new HttpException(HTTP_ERROR_EMAIL_TAKEN, HttpStatus.BAD_REQUEST)
    }

    await this.database.createAccount(body)

    return {}
  }
}
