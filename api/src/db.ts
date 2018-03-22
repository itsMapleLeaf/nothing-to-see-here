import neo4j from "neo4j-driver"
import securePassword from "secure-password"
import { promisify } from "util"

import { AccountData } from "./accountData"
import { databasePass, databaseUrl, databaseUser } from "./env"

const driver = neo4j.driver(databaseUrl, neo4j.auth.basic(databaseUser, databasePass))

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
  await verifyUserExistence(accountData)

  const hashedPassword = await hashPassword(Buffer.from(accountData.password))

  await session.run(`create (:User $accountData)`, {
    accountData: {
      ...accountData,
      password: hashedPassword.toString(),
    },
  })
}

export async function verifyUserExistence(details: Pick<AccountData, "username" | "email">) {
  const query = `
    match (u:User)
    where u.username = {username} or u.email = {email}
    return u.username, u.email
  `

  const result = await session.run(query, details)
  const record = result.records[0]

  if (record) {
    if (record.get("u.username") === details.username) {
      throw Error(`Username "${details.username}" exists`)
    }
    if (record.get("u.email") === details.email) {
      throw Error(`Email "${details.email}" is already registered`)
    }
  }
}
