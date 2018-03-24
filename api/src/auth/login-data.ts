import { Schema, string } from "joi"

export interface LoginData {
  usernameOrEmail: string
  password: string
}

export const loginDataSchema: Record<keyof LoginData, Schema> = {
  usernameOrEmail: string().required(),
  password: string().required(),
}
