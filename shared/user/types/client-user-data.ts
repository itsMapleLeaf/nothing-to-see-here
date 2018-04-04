export interface UserIdentity {
  username: string
  displayName: string
}

export interface ClientUserData extends UserIdentity {
  token: string
}
