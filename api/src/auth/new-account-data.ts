import { Schema, string } from "joi"

export interface NewAccountData {
  username: string
  displayName: string
  email: string
  password: string
}

export const newAccountDataSchema: Record<keyof NewAccountData, Schema> = {
  username: string()
    .min(3)
    .required(),
  displayName: string()
    .min(3)
    .required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(3)
    .required(),
}
