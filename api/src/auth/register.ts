import { RequestHandler } from "express"
import { Schema, string, validate } from "joi"

import { session } from "../db"
import { extractErrorMessage } from "../helpers/errors"
import { createHash } from "../helpers/secure-password"
import { createToken } from "./token"
import { verifyUserExistence } from "./user"

export interface NewAccountData {
  username: string
  displayName: string
  email: string
  password: string
}

export const newAccountDataSchema: Record<keyof NewAccountData, Schema> = {
  username: string()
    .min(3)
    .required(),
  displayName: string()
    .min(3)
    .required(),
  email: string()
    .email()
    .required(),
  password: string()
    .min(3)
    .required(),
}

export const registerRouteHandler: RequestHandler = async (req, res) => {
  try {
    const validationResult = validate<NewAccountData>(req.body, newAccountDataSchema)
    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error.details[0].message })
    }

    const accountCreationResult = await createAccount(validationResult.value)
    if (accountCreationResult.error) {
      return res.status(400).send({ error: accountCreationResult.error })
    }

    return res.status(200).send({ token: accountCreationResult.token })
  } catch (error) {
    res.status(500).send({ error: "Internal error" })
    console.error("register error:", extractErrorMessage(error))
  }
}

export async function createAccount(accountData: NewAccountData) {
  const existenceResult = await verifyUserExistence(accountData)
  if (existenceResult.error) {
    return { token: undefined, error: existenceResult.error }
  }

  const hashedPassword = await createHash(Buffer.from(accountData.password))

  await session.run(`create (:User $accountData)`, {
    accountData: {
      ...accountData,
      password: hashedPassword.toString(),
    },
  })

  const token = await createToken(accountData.username)
  return { token }
}
