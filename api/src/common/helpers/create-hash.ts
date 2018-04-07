import { pbkdf2 } from "crypto"
import { promisify } from "util"

const pbkdf2Promise = promisify(pbkdf2)

export async function createHash(secret: string, salt: string) {
  const buffer = await pbkdf2Promise(secret, salt, 100000, 64, "sha512")
  return buffer.toString("hex")
}
