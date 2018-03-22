import express from "express"

import { validateAccountData } from "./auth/accountData"
import { authenticate, createAccount } from "./auth/dbActions"
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

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)

  authenticate("kingdaro", "lol").then(console.log, console.error)
})
