import { Schema, string } from "joi"

export interface LoginDto {
  usernameOrEmail: string
  password: string
}

export const loginDtoSchema: Record<keyof LoginDto, Schema> = {
  usernameOrEmail: string().required(),
  password: string().required(),
}
