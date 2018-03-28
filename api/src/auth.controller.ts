import { Controller, Post } from "@nestjs/common"

@Controller()
export class AuthController {
  @Post("login")
  login(): string {
    return "you hit login route"
  }

  @Post("register")
  register(): string {
    return "you hit register route"
  }
}
