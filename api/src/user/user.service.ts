import neo4j from "neo4j-driver"
import securePassword from "secure-password"

import { NewUserData } from "../../../shared/user/types/new-user-data"
import { randomBytesPromise } from "../common/helpers/random-bytes-promise"
import { createHash, verifyHash } from "../common/helpers/secure-password"
import { User } from "./types/user.interface"

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 1 // 1 day

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

  async removeUser(username: string) {
    const query = `
      match (u:User { username: {username} })
      delete u
    `

    await this.session.run(query, { username })
  }

  async generateToken(username: string) {
    const token = (await randomBytesPromise(16)).toString("hex")
    const tokenDate = Date.now()

    const query = `
      match (u:User { username: {username} })
      set u.token = {token}
      set u.tokenDate = {tokenDate}
    `

    await this.session.run(query, { username, token, tokenDate })

    return token
  }

  async clearToken(username: string) {
    const query = `
      match (u:User { username: {username} })
      set u.token = null
      set u.tokenDate = null
    `

    await this.session.run(query, { username })
  }

  async isTokenValid(username: string, enteredToken: string) {
    const user = await this.getUserByUsername(username)
    if (!user) {
      return false
    }

    if (user.token !== enteredToken) {
      return false
    }

    if (Date.now() - Number(user.tokenDate) || 0 > TOKEN_EXPIRATION_TIME) {
      return false
    }

    return true
  }
}
