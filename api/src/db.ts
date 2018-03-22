import neo4j from "neo4j-driver"
import securePassword from "secure-password"
import { promisify } from "util"

import { AccountData } from "./accountData"
import { getEnvValue } from "./env"

const url = getEnvValue("DB_URL")
const user = getEnvValue("DB_USER")
const pass = getEnvValue("DB_PASS")

const driver = neo4j.driver(url, neo4j.auth.basic(user, pass))

driver.onCompleted = async () => {
  console.info("successfully connected to database")
}

driver.onError = error => {
  console.info("db connection error:", error.message)
}

const session = driver.session()

const passwordPolicy = securePassword()

const hashPassword = promisify<Buffer, Buffer>(passwordPolicy.hash.bind(passwordPolicy))

export async function createAccount(accountData: AccountData) {
  if (await userExists(accountData.username)) {
    throw Error(`User "${accountData.username}" already exists`)
  }

  const hashedPassword = await hashPassword(Buffer.from(accountData.password))
  await session.run(`create (:User $accountData)`, {
    accountData: {
      ...accountData,
      password: hashedPassword.toString(),
    },
  })
}

export async function userExists(username: string) {
  const { records } = await session.run(
    "match (:User { username: {username} }) return true limit 1",
    { username },
  )
  return records.length > 0
}
