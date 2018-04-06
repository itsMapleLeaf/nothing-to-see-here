import { instanceMethod, InstanceType, prop, Typegoose } from "typegoose"

export interface CharacterFields {
  name: string
  description: string
}

export class Character extends Typegoose {
  @prop({ required: true })
  fields!: CharacterFields

  @prop({ required: true })
  ownerName!: string

  @instanceMethod
  serialize(this: InstanceType<Character>) {
    return {
      id: this._id,
      ownerName: this.ownerName,
      fields: this.fields,
    }
  }
}

export const CharacterModel = new Character().getModelForClass(Character)
