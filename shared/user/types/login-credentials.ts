import { Schema, string } from "joi"

export interface LoginCredentials {
  usernameOrEmail: string
  password: string
}

export const loginCredentialsSchema: Record<keyof LoginCredentials, Schema> = {
  usernameOrEmail: string().required(),
  password: string().required(),
}
