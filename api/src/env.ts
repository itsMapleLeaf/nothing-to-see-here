import dotenv from "dotenv"
import { resolve } from "path"

import { throwError } from "./helpers/error-handling"

const configResult = dotenv.config({
  path: resolve(__dirname, "../../.env"),
})

if (configResult.error) throw configResult.error

function safeGetValue(name: string) {
  return process.env[name] || throwError(`Environment variable "${name}" is not defined`)
}

export const databaseUser = safeGetValue("DB_USER")
export const databasePass = safeGetValue("DB_PASS")
export const databaseUrl = safeGetValue("DB_URL")
export const port = Number(process.env.PORT) || 3000
