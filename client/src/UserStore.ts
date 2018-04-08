import Axios, { AxiosResponse } from "axios"
import { bind } from "decko"
import * as idb from "idb-keyval"
import { action, observable } from "mobx"

import { endpoints } from "../../shared/constants/api-endpoints"
import { ClientUserData, UserIdentity } from "../../shared/user/types/client-user-data"
import { LoginCredentials } from "../../shared/user/types/login-credentials"
import { NewUserData } from "../../shared/user/types/new-user-data"
import { extractErrorMessage } from "./helpers/errorHelpers"

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
  login(loginDto: LoginCredentials) {
    return api
      .post(endpoints.login, loginDto)
      .then(getResponseData)
      .then(this.setUserData)
      .then(this.saveSession)
  }

  @bind
  logout() {
    if (this.userData) {
      return api
        .post(endpoints.logout, { name: this.userData.name })
        .then(this.clearUserData)
        .then(this.clearSession)
    }
  }

  @bind
  register(newUserData: NewUserData) {
    return api
      .post(endpoints.register, newUserData)
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
    try {
      const userData = await idb.get<ClientUserData | null>(SESSION_KEY)
      if (!userData) {
        return
      }

      const headers = {
        name: userData.name,
        token: userData.token,
      }
      const { data } = await api.post<UserIdentity>(endpoints.authUser, {}, { headers })

      this.setUserData({ ...data, token: userData.token })
    } catch (error) {
      console.warn("(non-fatal) could not restore session:", extractErrorMessage(error))
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
