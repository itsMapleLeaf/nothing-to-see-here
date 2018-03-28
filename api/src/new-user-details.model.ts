import { IsEmail, Length, Matches, Max } from "class-validator"

export class NewUserDetails {
  @Length(3, 32)
  @Matches(/^[a-z0-9-_]+$/i, {
    message: "can only contain letters, numbers, dashes (-) or underscores (_)",
  })
  username!: string

  @IsEmail({}, { message: "must be a valid email" })
  email!: string

  @Length(3)
  password!: string

  @Max(64)
  displayName!: string
}
