import securePassword from "secure-password"

import { session } from "../db"
import { randomBytesPromise } from "../helpers/random-bytes-promise"
import { createHash, verifyHash } from "../helpers/secure-password"

const TOKEN_EXPIRATION_TIME = 1000 * 60 * 60 * 24

export async function createToken(username: string) {
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
  const tokenDate = Number(record.get("u.tokenDate")) || 0

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
      throw Error(`Unrecognized hash`)

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

export async function rehashToken(username: string, token: string) {
  const improvedHash = (await createHash(Buffer.from(token))).toString()

  const rehashQuery = `
    match (u:User { username: {username} })
    set u.token = {improvedHash}
  `

  await session.run(rehashQuery, { username, improvedHash })
}
