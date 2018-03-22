export interface AccountData {
  username: string
  displayName: string
  email: string
  password: string
}

export function validateAccountData(data: any): AccountData {
  if (typeof data.username !== "string") throw Error("username is not a string")
  if (typeof data.displayName !== "string") throw Error("displayName is not a string")
  if (typeof data.email !== "string") throw Error("email is not a string")
  if (typeof data.password !== "string") throw Error("password is not a string")
  return data
}
