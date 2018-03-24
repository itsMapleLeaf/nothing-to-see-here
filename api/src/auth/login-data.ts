import { Schema, string } from "joi"

export interface LoginData {
  usernameOrEmail: string
  password: string
}

export const loginDataSchema: Record<keyof LoginData, Schema> = {
  usernameOrEmail: string()
    .min(3)
    .required(),
  password: string()
    .min(3)
    .required(),
}
