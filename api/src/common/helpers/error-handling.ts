export function extractErrorMessage(error: any) {
  return error.message || String(error)
}

export function throwError(msg: string): never {
  throw Error(msg)
}
