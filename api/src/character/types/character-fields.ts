import { Schema, string } from "joi"

export interface CharacterFields {
  name: string
  description: string
}

export const characterFieldsSchema: Record<keyof CharacterFields, Schema> = {
  name: string()
    .required()
    .min(3),

  description: string().required(),
}
