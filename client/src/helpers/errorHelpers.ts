export function showError(error: any) {
  alert((error.response && error.response.data.error) || error.message || String(error))
}
