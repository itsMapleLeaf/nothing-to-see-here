import Axios, { AxiosResponse } from "axios"
import { bind } from "decko"
import * as idb from "idb-keyval"
import { action, observable } from "mobx"

import { ClientUserData } from "../../shared/user/types/client-user-data"
import { LoginDto } from "../../shared/user/types/login-dto"
import { NewUserData } from "../../shared/user/types/new-user-data"

const api = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

function getResponseData<T>(response: AxiosResponse<T>): T {
  return response.data
}

const SESSION_KEY = "session"

export class UserStore {
  @observable.ref userData?: ClientUserData

  @bind
  login(loginDto: LoginDto) {
    return api
      .post("/login", loginDto)
      .then(getResponseData)
      .then(this.setUserData)
      .then(this.saveSession)
  }

  @bind
  logout() {
    if (this.userData) {
      return api
        .post("/logout", { username: this.userData.username })
        .then(this.clearUserData)
        .then(this.clearSession)
    }
  }

  @bind
  register(newUserData: NewUserData) {
    return api
      .post("/register", newUserData)
      .then(getResponseData)
      .then(this.setUserData)
      .then(this.saveSession)
  }

  @bind
  clearSession() {
    return idb.del(SESSION_KEY)
  }

  @bind
  saveSession() {
    return idb.set(SESSION_KEY, this.userData)
  }

  @bind
  async restoreSession() {
    const userData = await idb.get<ClientUserData | null>(SESSION_KEY)
    if (userData) {
      this.setUserData(userData)
    }
  }

  @action.bound
  private clearUserData() {
    this.userData = undefined
  }

  @action.bound
  private setUserData(userData: ClientUserData) {
    this.userData = userData
  }
}

export const userStore = new UserStore()
