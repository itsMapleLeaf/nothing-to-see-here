import { IsEmail, Length, Matches } from "class-validator"

export class RegisterDto {
  @Length(3, 32)
  @Matches(/^[a-z0-9-_]+$/i, {
    message: "can only contain letters, numbers, dashes (-) or underscores (_)",
  })
  readonly username!: string

  @IsEmail({}, { message: "must be a valid email" })
  readonly email!: string

  @Length(3)
  readonly password!: string

  @Length(0, 64)
  readonly displayName!: string
}
