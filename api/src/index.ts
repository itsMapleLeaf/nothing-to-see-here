import express from "express"

import { validateNewAccountData } from "./auth/new-account-data"
import { createAccount, logIn } from "./auth/db-actions"
import { validateLoginData } from "./auth/login-data"
import { port } from "./env"
import { extractErrorMessage } from "./helpers"

const app = express()

app.use(express.json())

app.post("/register", async (req, res) => {
  try {
    const accountData = validateNewAccountData(req.body)
    const token = await createAccount(accountData)
    res.send({ token })
  } catch (error) {
    res.send({ error: extractErrorMessage(error) })
    console.error("register error:", error)
  }
})

app.post("/login", async (req, res) => {
  try {
    const loginData = validateLoginData(req.body)
    const token = await logIn(loginData.usernameOrEmail, loginData.password)
    res.send({ token })
  } catch (error) {
    res.send({ error: extractErrorMessage(error) })
    console.error("login error:", error)
  }
})

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
