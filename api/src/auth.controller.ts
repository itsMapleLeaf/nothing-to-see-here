import { Controller, HttpException, HttpStatus, Post, Req } from "@nestjs/common"
import { Request } from "express"
import neo4j from "neo4j-driver"
import { driver, session } from "neo4j-driver/types/v1"
import securePassword from "secure-password"

import { databasePass, databaseUrl, databaseUser } from "./env"
import { verifyHash } from "./helpers/secure-password"

type LoginRequestBody = {
  usernameOrEmail: string
  password: string
}

type LoginResponseData = {
  token: string
}

const HTTP_ERROR_BAD_LOGIN = "Invalid email, username, or password"

@Controller()
export class AuthController {
  driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))
  session = this.driver.session()

  @Post("login")
  async login(@Req() request: Request): Promise<LoginResponseData> {
    const { usernameOrEmail, password } = request.body as LoginRequestBody

    const query = `
      match (u:User)
      where u.username = {usernameOrEmail} or u.email = {usernameOrEmail}
      return u.username, u.password
    `

    const dbResult = await this.session.run(query, { usernameOrEmail })
    const record = dbResult.records[0]

    if (!record) {
      throw new HttpException(HTTP_ERROR_BAD_LOGIN, HttpStatus.BAD_REQUEST)
    }

    const verifyResult = await verifyHash(
      Buffer.from(password),
      Buffer.from(record.get("u.password")),
    )

    switch (verifyResult) {
      case securePassword.VALID:
        break

      case securePassword.VALID_NEEDS_REHASH:
        // rehash
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

    return { token: "fdsjkfls" }
  }
}
