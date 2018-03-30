import { Context } from "koa"

import { User } from "./user.interface"

export interface UserContext extends Context {
  state: {
    user?: User
  }
}
