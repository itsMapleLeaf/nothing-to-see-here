import { session } from "../db"
import { createHash } from "../helpers/secure-password"

export async function verifyUserExistence(details: { username: string; email: string }) {
  const query = `
    match (u:User)
    where u.username = {username} or u.email = {email}
    return u.username, u.email
  `

  const result = await session.run(query, details)
  const record = result.records[0]

  if (record) {
    if (record.get("u.username") === details.username) {
      return { error: `Username "${details.username}" exists` }
    }
    if (record.get("u.email") === details.email) {
      return { error: `Email "${details.email}" is already registered` }
    }
  }
  return {}
}

export async function rehashPassword(username: string, password: string) {
  const improvedHash = (await createHash(Buffer.from(password))).toString()

  const rehashQuery = `
    match (u:User { username: {username} })
    set u.password = {improvedHash}
  `

  await session.run(rehashQuery, { username, improvedHash })
}
