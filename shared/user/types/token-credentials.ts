import { Schema, string } from "joi"

export interface TokenCredentials {
  name: string
  token: string
}

export const tokenCredentialsSchema: Record<keyof TokenCredentials, Schema> = {
  name: string().required(),
  token: string().required(),
}
