import express from "express"

import { loginRouteHandler } from "./auth/login"
import { registerRouteHandler } from "./auth/register"
import { port } from "./env"

const app = express()

app.use(express.json())

app.post("/login", loginRouteHandler)
app.post("/register", registerRouteHandler)

app.listen(port, async () => {
  console.info(`server listening on http://localhost:${port}`)
})
