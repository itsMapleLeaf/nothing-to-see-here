import express from "express"

import { validateAccountData } from "./accountData"
import { createAccount } from "./db"
import { getEnvValue } from "./env"
import { extractErrorMessage } from "./helpers"

const port = Number(getEnvValue("PORT", "3000"))

const app = express()

app.use(express.json())

app.post("/register", async (req, res) => {
  try {
    const accountData = validateAccountData(req.body)
    await createAccount(req.body)
    res.send({ success: true }) // send back a token?
  } catch (error) {
    res.send({ error: extractErrorMessage(error) })
    console.error("register error:", error)
  }
})

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
