import { randomBytes } from "crypto"
import { promisify } from "util"

export const randomBytesPromise = promisify(randomBytes)
