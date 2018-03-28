import securePassword from "secure-password"
import { promisify } from "util"

const passwordPolicy = securePassword()

export const createHash = promisify<Buffer, Buffer>(passwordPolicy.hash.bind(passwordPolicy))
export const verifyHash = promisify<Buffer, Buffer, any>(passwordPolicy.verify.bind(passwordPolicy))
