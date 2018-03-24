import express from "express"
import { validate } from "joi"

import { createAccount, logIn } from "./auth/db-actions"
import { LoginData, loginDataSchema } from "./auth/login-data"
import { NewAccountData, newAccountDataSchema } from "./auth/new-account-data"
import { port } from "./env"
import { extractErrorMessage } from "./helpers"

const app = express()

app.use(express.json())

app.post("/login", async (req, res) => {
  console.log(req.body)
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
})

app.post("/register", async (req, res) => {
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
})

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
