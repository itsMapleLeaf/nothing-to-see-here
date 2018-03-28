import { IsString } from "class-validator"

export class LoginDetails {
  @IsString() usernameOrEmail!: string
  @IsString() password!: string
}
