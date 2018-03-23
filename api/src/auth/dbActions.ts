import { randomBytes } from "crypto"
import securePassword from "secure-password"
import { promisify } from "util"

import { session } from "../db"
import { AccountData } from "./accountData"

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24

const passwordPolicy = securePassword()

const createHash = promisify<Buffer, Buffer>(passwordPolicy.hash.bind(passwordPolicy))
const verifyHash = promisify<Buffer, Buffer, any>(passwordPolicy.verify.bind(passwordPolicy))
const randomBytesPromise = promisify(randomBytes)

export async function createAccount(accountData: AccountData) {
  await verifyUserExistence(accountData)

  const hashedPassword = await createHash(Buffer.from(accountData.password))

  await session.run(`create (:User $accountData)`, {
    accountData: {
      ...accountData,
      password: hashedPassword.toString(),
    },
  })

  return await createToken(accountData.username)
}

export async function verifyUserExistence(details: Pick<AccountData, "username" | "email">) {
  const query = `
    match (u:User)
    where u.username = {username} or u.email = {email}
    return u.username, u.email
  `

  const result = await session.run(query, details)
  const record = result.records[0]

  if (record) {
    if (record.get("u.username") === details.username) {
      throw Error(`Username "${details.username}" exists`)
    }
    if (record.get("u.email") === details.email) {
      throw Error(`Email "${details.email}" is already registered`)
    }
  }
}

export async function logIn(usernameOrEmail: string, enteredPassword: string): Promise<string> {
  const query = `
    match (u:User)
    where u.username = {usernameOrEmail} or u.email = {usernameOrEmail}
    return u.username, u.password
  `

  const dbResult = await session.run(query, { usernameOrEmail })
  const record = dbResult.records[0]

  if (!record) {
    throw Error(`Invalid email or password`)
  }

  const currentPassword = String(record.get("u.password"))
  const username = String(record.get("u.username"))

  const verifyResult = await verifyHash(Buffer.from(enteredPassword), Buffer.from(currentPassword))

  switch (verifyResult) {
    case securePassword.INVALID_UNRECOGNIZED_HASH:
      console.error("Unrecognized hash")
      throw Error(`Internal error while logging in`)

    case securePassword.INVALID:
      throw Error(`Invalid email or password`)

    case securePassword.VALID:
      return await createToken(username)

    case securePassword.VALID_NEEDS_REHASH:
      await rehashPassword(username, enteredPassword)
      return await createToken(username)

    default:
      throw Error(`Internal error: unknown verification result`)
  }
}

export async function logOut(username: string) {
  await session.run(`match (u:User { username: {username} }) set u.token = null`, { username })
}

export async function verifyToken(username: string, enteredToken: string): Promise<true> {
  const getUserQuery = `
    match (u:User { username: {username} })
    return u.token, u.tokenDate
  `

  const result = await session.run(getUserQuery, { username })
  const record = result.records[0]

  if (!record) {
    throw Error(`User not found: "${username}"`)
  }

  const currentToken = String(record.get("u.token"))
  const tokenDate = Number(record.get("u.tokenDate"))

  const verifyResult = await verifyHash(Buffer.from(enteredToken), Buffer.from(currentToken))

  switch (verifyResult) {
    case securePassword.VALID:
      break

    case securePassword.VALID_NEEDS_REHASH:
      await rehashToken(username, enteredToken)
      break

    case securePassword.INVALID:
      throw Error(`Invalid token`)

    case securePassword.INVALID_UNRECOGNIZED_HASH:
      console.error("Unrecognized hash")
      throw Error(`Internal error`)

    default:
      console.error(`unknown verification result`)
      throw Error(`Internal error`)
  }

  const currentDate = Date.now()

  if (currentDate - tokenDate > TOKEN_EXPIRATION_TIME) {
    throw Error(`Token has expired`)
  }

  return true
}

async function createToken(username: string) {
  const token = (await randomBytesPromise(32)).toString("hex")
  const tokenHash = await createHash(Buffer.from(token))

  const tokenHashQuery = `
    match (u:User { username: {username} })
    set u.token = {token}
    set u.tokenDate = {tokenDate}
  `

  await session.run(tokenHashQuery, {
    username,
    token: tokenHash.toString(),
    tokenDate: Date.now(),
  })

  return token
}

async function rehashPassword(username: string, password: string) {
  const improvedHash = (await createHash(Buffer.from(password))).toString()

  const rehashQuery = `
    match (u:User { username: {username} })
    set u.password = {improvedHash}
  `

  await session.run(rehashQuery, { username, improvedHash })
}

async function rehashToken(username: string, token: string) {
  const improvedHash = (await createHash(Buffer.from(token))).toString()

  const rehashQuery = `
    match (u:User { username: {username} })
    set u.token = {improvedHash}
  `

  await session.run(rehashQuery, { username, improvedHash })
}
