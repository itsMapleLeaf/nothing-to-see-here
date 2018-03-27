import { RequestHandler } from "express"
import { Schema, string, validate } from "joi"
import securePassword from "secure-password"

import { session } from "../db"
import { extractErrorMessage } from "../helpers/errors"
import { verifyHash } from "../helpers/secure-password"
import { createToken } from "./token"
import { rehashPassword } from "./user"

export interface LoginData {
  usernameOrEmail: string
  password: string
}

export const loginDataSchema: Record<keyof LoginData, Schema> = {
  usernameOrEmail: string()
    .min(3)
    .required(),
  password: string()
    .min(3)
    .required(),
}

export const loginRouteHandler: RequestHandler = async (req, res) => {
  try {
    const validationResult = validate<LoginData>(req.body, loginDataSchema)
    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error.details[0].message })
    }

    const { usernameOrEmail, password } = validationResult.value

    const loginResult = await logIn(usernameOrEmail, password)
    if (loginResult.error) {
      return res.status(400).send({ error: loginResult.error })
    }

    res.status(200).send({ token: loginResult.token })
  } catch (error) {
    res.status(500).send({ error: "Internal error" })
    console.error("login error:", extractErrorMessage(error))
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
    return { error: `Invalid email or password` }
  }

  const currentPassword = String(record.get("u.password"))
  const username = String(record.get("u.username"))

  const verifyResult = await verifyHash(Buffer.from(enteredPassword), Buffer.from(currentPassword))

  switch (verifyResult) {
    case securePassword.VALID:
      return { token: await createToken(username) }

    case securePassword.VALID_NEEDS_REHASH:
      await rehashPassword(username, enteredPassword)
      return { token: await createToken(username) }

    case securePassword.INVALID:
      return { error: `Invalid email or password` }

    case securePassword.INVALID_UNRECOGNIZED_HASH:
      throw Error("Unrecognized hash")

    default:
      throw Error(`unknown verification result`)
  }
}

export async function logOut(username: string) {
  await session.run(`match (u:User { username: {username} }) set u.token = null`, { username })
}
