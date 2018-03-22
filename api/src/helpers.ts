export function extractErrorMessage(error: any) {
  return error.message || String(error)
}
