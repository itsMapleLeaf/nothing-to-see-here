import securePassword from "secure-password"
import { promisify } from "util"

import { session } from "../db"
import { AccountData } from "./accountData"

const passwordPolicy = securePassword()

const createHash = promisify<Buffer, Buffer>(passwordPolicy.hash.bind(passwordPolicy))
const verifyHash = promisify<Buffer, Buffer, any>(passwordPolicy.verify.bind(passwordPolicy))

export async function createAccount(accountData: AccountData) {
  await verifyUserExistence(accountData)

  const hashedPassword = await createHash(Buffer.from(accountData.password))

  await session.run(`create (:User $accountData)`, {
    accountData: {
      ...accountData,
      password: hashedPassword.toString(),
    },
  })
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

export async function logIn(usernameOrEmail: string, enteredPassword: string) {
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

  const currentPassword = record.get("u.password")

  const verifyResult = await verifyHash(Buffer.from(enteredPassword), Buffer.from(currentPassword))

  switch (verifyResult) {
    case securePassword.INVALID_UNRECOGNIZED_HASH:
      console.error("Unrecognized hash")
      throw Error(`Internal error while logging in`)

    case securePassword.INVALID:
      throw Error(`Invalid email or password`)

    case securePassword.VALID:
      return true // return token?

    case securePassword.VALID_NEEDS_REHASH:
      await rehashPassword(record.get("u.username"), enteredPassword)
      return true // return token?
  }
}

async function rehashPassword(username: string, password: string) {
  const improvedHash = (await createHash(Buffer.from(password))).toString()

  const rehashQuery = `
    match (u:User { username: {username} })
    set u.password = {improvedHash}
  `

  await session.run(rehashQuery, { username, improvedHash })
}
