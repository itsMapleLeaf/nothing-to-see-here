import dotenv from "dotenv"
import { resolve } from "path"

const result = dotenv.config({
  path: resolve(__dirname, "../../.env"),
})

export function getEnvValue(key: string, defaultValue?: string) {
  if (result.error) {
    throw Error(`Error loading config: ${result.error}`)
  }

  const value = result.parsed && result.parsed[key]
  if (!value) {
    if (defaultValue) {
      return defaultValue
    }

    throw Error(`Invalid env key: ${key} (no default provided)`)
  }

  return value
}
