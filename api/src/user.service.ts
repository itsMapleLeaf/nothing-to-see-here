import neo4j from "neo4j-driver"

import { randomBytesPromise } from "./helpers/random-bytes-promise"
import { createHash } from "./helpers/secure-password"

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

  async createUser(newUserData: any) {
    const { username, email, password, displayName } = newUserData

    const passwordHash = await createHash(Buffer.from(password))

    const details = { username, email, displayName, password: passwordHash.toString() }
    const newAccountQuery = `create (:User $details)`
    await this.session.run(newAccountQuery, { details })
  }

  async createToken(username: string) {
    // create the token
    const tokenString = await randomBytesPromise(16)

    // hash the token
    const tokenHash = (await createHash(Buffer.from(tokenString))).toString()

    // save token to database
    const query = `
      match (u:User { username: {username} })
      set u.token = {tokenHash}
    `
    await this.session.run(query, { username, tokenHash })

    return tokenString
  }
}
