import axios, { AxiosError } from "axios"
import { action, computed, observable } from "mobx"

export type AuthState =
  | { type: "signed-out" }
  | { type: "signed-in"; token: string }
  | { type: "signing-in" }

export class AuthStore {
  @observable authenticating = false
  @observable token?: string

  @action
  setAuthenticating(authenticating: boolean) {
    this.authenticating = authenticating
  }

  @action
  setToken(token: string) {
    this.token = token
  }

  @action
  clearToken() {
    this.token = undefined
  }

  @computed
  get signedIn() {
    return this.token !== undefined
  }

  signIn = async (usernameOrEmail: string, password: string) => {
    this.setAuthenticating(true)
    try {
      const response = await axios.post("http://localhost:3000/login", {
        usernameOrEmail,
        password,
      })
      this.setToken(response.data.token)
    } catch (error) {
      const axiosError = error as AxiosError
      throw axiosError.message
    } finally {
      this.setAuthenticating(false)
    }
  }

  signOut = async () => {
    await axios.post("http://localhost:3000/logout", { username: "kingdaro" })
    this.clearToken()
  }
}

export const authStore = new AuthStore()
