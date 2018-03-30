import { Schema, string } from "joi"

export interface NewUserData {
  username: string
  email: string
  password: string
  displayName: string
}

export const newUserDataSchema: Record<keyof NewUserData, Schema> = {
  username: string()
    .required()
    .min(3)
    .regex(/^[a-z0-9-_]+$/i),

  email: string()
    .required()
    .email(),

  password: string()
    .required()
    .min(8),

  displayName: string()
    .required()
    .min(3),
}