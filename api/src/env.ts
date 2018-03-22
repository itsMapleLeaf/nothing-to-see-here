import dotenv from "dotenv"
import { resolve } from "path"

dotenv.config({
  path: resolve(__dirname, "../../.env"),
})

function throwError(msg: string): never {
  throw Error(msg)
}

export const databaseUser =
  process.env.DB_USER || throwError('"DB_USER" Environment variable missing')
export const databasePass =
  process.env.DB_PASS || throwError('"DB_PASS" Environment variable missing')
export const databaseUrl = process.env.DB_URL || throwError('"DB_URL" Environment variable missing')
export const port = Number(process.env.PORT) || 3000
