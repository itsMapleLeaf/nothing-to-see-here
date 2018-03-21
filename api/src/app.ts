import express from "express"

import { userExists } from "./db"

const port = Number(process.env.PORT) || 3000

const app = express()

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(port, async () => {
  console.log(`server listening on http://localhost:${port}`)

  console.log("nobody exists:", await userExists("nobody"))
  console.log("somebody exists:", await userExists("somebody"))
})
