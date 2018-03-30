import neo4j from "neo4j-driver"

import { randomBytesPromise } from "./helpers/random-bytes-promise"
import { createHash } from "./helpers/secure-password"
import { NewUserData } from "./new-user-data.interface"
import { User } from "./user.interface"

export class UserService {
  constructor(private session: neo4j.Session) {}

  async userExists(username: string, email: string) {
    const userExistsQuery = `
      match (u:User)
      where u.username = {username} or u.email = {email}
      return properties(u) as user
    `

    const { records } = await this.session.run(userExistsQuery, { username, email })
    return records.length > 0
  }

  async createUser(newUserData: NewUserData): Promise<User> {
    const { username, email, password, displayName } = newUserData

    const passwordHash = await createHash(Buffer.from(password))

    const user: User = {
      username,
      email,
      displayName,
      password: passwordHash.toString(),
    }

    const newAccountQuery = `create (u:User $user)`

    await this.session.run(newAccountQuery, { user })

    return user
  }

  async createToken(username: string) {
    const tokenString = (await randomBytesPromise(16)).toString("hex")
    const tokenHash = (await createHash(Buffer.from(tokenString))).toString()

    const query = `
      match (u:User { username: {username} })
      set u.token = {tokenHash}
    `
    await this.session.run(query, { username, tokenHash })

    return tokenString
  }
}
