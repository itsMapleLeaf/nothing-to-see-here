import { instanceMethod, prop, Typegoose } from "typegoose"

import { randomBytesPromise } from "../common/helpers/random-bytes-promise"

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 1 // 1 day

export class User extends Typegoose {
  @prop({ required: true })
  name!: string

  @prop({ required: true })
  displayName!: string

  @prop({ required: true })
  email!: string

  @prop({ required: true })
  passwordHash!: string

  @prop({ required: true })
  salt!: string

  @prop() token?: string

  @prop() tokenDate?: number

  @instanceMethod
  async generateToken() {
    this.token = (await randomBytesPromise(16)).toString("hex")
    this.tokenDate = Date.now()
  }

  @instanceMethod
  isTokenValid(enteredToken: string) {
    return (
      this.token &&
      this.tokenDate &&
      enteredToken === this.token &&
      Date.now() - this.tokenDate < TOKEN_EXPIRATION_TIME
    )
  }

  @instanceMethod
  clearToken() {
    this.token = undefined
    this.tokenDate = undefined
  }
}

export const UserModel = new User().getModelForClass(User)
