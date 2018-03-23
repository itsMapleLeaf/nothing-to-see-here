export interface LoginData {
  usernameOrEmail: string
  password: string
}

export function validateLoginData(data: any): LoginData {
  if (typeof data.usernameOrEmail !== "string") throw Error("usernameOrEmail is not a string")
  if (typeof data.password !== "string") throw Error("password is not a string")
  return data
}
