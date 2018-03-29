import express from "express"

import { port } from "./env"

const app = express()

app.listen(port, () => {
  console.info(`listening on http://localhost:${port}`)
})
