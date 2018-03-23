import express from "express"

import { validateAccountData } from "./auth/accountData"
import { authenticate, createAccount } from "./auth/dbActions"
import { validateLoginData } from "./auth/loginData"
import { port } from "./env"
import { extractErrorMessage } from "./helpers"

const app = express()

app.use(express.json())

app.post("/register", async (req, res) => {
  try {
    const accountData = validateAccountData(req.body)
    await createAccount(accountData)
    res.send({ success: true }) // send back a token?
  } catch (error) {
    res.send({ error: extractErrorMessage(error) })
    console.error("register error:", error)
  }
})

app.post("/login", async (req, res) => {
  try {
    const loginData = validateLoginData(req.body)
    await authenticate(loginData.usernameOrEmail, loginData.password)
    res.send({ success: true }) // send token?
  } catch (error) {
    res.send({ error: extractErrorMessage(error) })
    console.error("login error:", error)
  }
})

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
