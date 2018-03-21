import express from "express"

const port = Number(process.env.PORT) || 3000

const app = express()

app.get("/", (req, res) => {
  res.send("hi")
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
