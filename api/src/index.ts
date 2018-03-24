import express from "express"
import { validate } from "joi"

import { createAccount, logIn } from "./auth/db-actions"
import { LoginData, loginDataSchema } from "./auth/login-data"
import { NewAccountData, newAccountDataSchema } from "./auth/new-account-data"
import { port } from "./env"
import { extractErrorMessage } from "./helpers"

const app = express()

app.use(express.json())

app.post("/register", async (req, res) => {
  try {
    const validationResult = validate<NewAccountData>(req.body, newAccountDataSchema)
    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error })
    }

    const token = await createAccount(validationResult.value)
    res.send({ token })
  } catch (error) {
    res.status(500).send({ error: "Internal error" })
    console.error("register error:", extractErrorMessage(error))
  }
})

app.post("/login", async (req, res) => {
  try {
    const validationResult = validate<LoginData>(req.body, loginDataSchema)
    if (validationResult.error) {
      return res.status(400).send({ error: validationResult.error })
    }

    const { usernameOrEmail, password } = validationResult.value
    const token = await logIn(usernameOrEmail, password)
    res.send({ token })
  } catch (error) {
    res.status(500).send({ error: "Internal error" })
    console.error("login error:", extractErrorMessage(error))
  }
})

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
