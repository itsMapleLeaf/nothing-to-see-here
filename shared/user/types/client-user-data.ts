export interface UserIdentity {
  name: string
  displayName: string
}

export interface ClientUserData extends UserIdentity {
  token: string
}
