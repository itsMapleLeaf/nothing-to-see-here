import { prop, Typegoose } from "typegoose"

export interface CharacterFields {
  name: string
  description: string
}

export class Character extends Typegoose implements CharacterFields {
  @prop({ required: true })
  name!: string

  @prop({ required: true })
  description!: string
}

export const CharacterModel = new Character().getModelForClass(Character)
