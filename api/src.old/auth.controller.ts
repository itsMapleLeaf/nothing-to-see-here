import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import securePassword from "secure-password"

import { verifyHash } from "./helpers/secure-password"
import { LoginDto } from "./login.dto"
import { LogoutDto } from "./logout.dto"
import { RegisterDto } from "./register.dto"
import { UserService } from "./user.service"

type LoginResponseData = { token: string }

type RegisterResponseData = { token: string }

const HTTP_ERROR_VALIDATION_FAILED = "Validation failed"
const HTTP_ERROR_BAD_LOGIN = "Invalid email, username, or password"
const HTTP_ERROR_USERNAME_TAKEN = "Username is taken"
const HTTP_ERROR_EMAIL_TAKEN = "Email is taken"

@Controller()
export class AuthController {
  constructor(private users: UserService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseData> {
    const { usernameOrEmail, password } = loginDto

    const user = await this.users.getUserByUsernameOrEmail(usernameOrEmail)
    if (!user) {
      throw new BadRequestException(HTTP_ERROR_BAD_LOGIN)
    }

    const verifyResult = await verifyHash(Buffer.from(password), Buffer.from(user.password))
    switch (verifyResult) {
      case securePassword.VALID:
        break

      case securePassword.VALID_NEEDS_REHASH:
        await this.users.rehashPassword(user.username, user.password)
        break

      case securePassword.INVALID:
        throw new BadRequestException(HTTP_ERROR_BAD_LOGIN)

      case securePassword.INVALID_UNRECOGNIZED_HASH:
        console.error("Internal error: unrecognized hash")
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)

      default:
        console.error("Internal error: unknown verification result")
        throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
    }

    const token = await this.users.createToken(user.username)
    return { token }
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async logout(@Body() logoutDto: LogoutDto): Promise<{}> {
    await this.users.clearToken(logoutDto.username)
    return {}
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createAccount(@Body() registerDto: RegisterDto): Promise<RegisterResponseData> {
    const [usernameTaken, emailTaken] = await Promise.all([
      this.users.isUsernameTaken(registerDto.username),
      this.users.isEmailTaken(registerDto.email),
    ])

    if (usernameTaken) throw new BadRequestException(HTTP_ERROR_USERNAME_TAKEN)
    if (emailTaken) throw new BadRequestException(HTTP_ERROR_EMAIL_TAKEN)

    await this.users.createUser(registerDto)

    const token = await this.users.createToken(registerDto.username)
    return { token }
  }
}
