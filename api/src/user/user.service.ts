import neo4j from "neo4j-driver"
import securePassword from "secure-password"

import { randomBytesPromise } from "../common/helpers/random-bytes-promise"
import { createHash, verifyHash } from "../common/helpers/secure-password"
import { NewUserData } from "./types/new-user-data.interface"
import { User } from "./types/user.interface"

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

  async clearToken(username: string) {
    const query = `
      match (u:User { username: {username} })
      set u.token = null
    `
    await this.session.run(query, { username })
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const query = `
      match (u:User { username: {username} })
      return properties(u) as user
    `

    const { records } = await this.session.run(query, { username })
    if (records[0]) {
      return records[0].get("user") as User
    }
  }

  async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | undefined> {
    const query = `
      match (u:User)
      where u.username = {usernameOrEmail} or u.email = {usernameOrEmail}
      return properties(u) as user
    `

    const { records } = await this.session.run(query, { usernameOrEmail })
    if (records[0]) {
      return records[0].get("user") as User
    }
  }

  async isPasswordValid(username: string, enteredPassword: string): Promise<boolean> {
    const user = await this.getUserByUsername(username)
    if (!user) {
      return false
    }

    const verifyResult = await verifyHash(Buffer.from(enteredPassword), Buffer.from(user.password))
    switch (verifyResult) {
      case securePassword.VALID:
        return true

      case securePassword.VALID_NEEDS_REHASH:
        await this.rehashPassword(user.username, user.password)
        return true

      case securePassword.INVALID:
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      default:
        return false
    }
  }

  async rehashPassword(username: string, password: string) {
    const passwordHash = (await createHash(Buffer.from(password))).toString()

    const query = `
      match (u:User { username: {username} })
      set u.password = {password}
    `

    await this.session.run(query, { username, password: passwordHash })
  }
}