import express from "express"

import { LoginData, loginDataSchema, loginRouteHandler } from "./auth/login"
import { NewAccountData, newAccountDataSchema, registerRouteHandler } from "./auth/register"
import { port } from "./env"
import { validateBody } from "./helpers/validate-body"

const app = express()

app.use(express.json())

app.post("/login", validateBody<LoginData>(loginDataSchema, loginRouteHandler))
app.post("/register", validateBody<NewAccountData>(newAccountDataSchema, registerRouteHandler))

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
