export function extractErrorMessage(error: any): string {
  return (error.response && error.response.data.error) || error.message || String(error)
}
