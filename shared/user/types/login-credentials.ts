import { Schema, string } from "joi"

export interface LoginCredentials {
  nameOrEmail: string
  password: string
}

export const loginCredentialsSchema: Record<keyof LoginCredentials, Schema> = {
  nameOrEmail: string().required(),
  password: string().required(),
}
