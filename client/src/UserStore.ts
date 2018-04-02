import Axios, { AxiosResponse } from "axios"
import { action, observable } from "mobx"
import { LoginDto } from "../../shared/user/types/login-dto"
import { NewUserData } from "../../shared/user/types/new-user-data"

const api = Axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

export class UserStore {
  @observable.ref userData: any = null

  login({ usernameOrEmail, password }: LoginDto) {
    return api.post("/login", { usernameOrEmail, password }).then(this.loginSuccess)
  }

  logout() {
    return api.post("/logout", { username: this.userData.username }).then(this.logoutSuccess)
  }

  register(newUserData: NewUserData) {
    return api.post("/register", newUserData).then(this.registerSuccess)
  }

  @action.bound
  private logoutSuccess() {
    this.userData = null
  }

  @action.bound
  private loginSuccess(response: AxiosResponse) {
    this.userData = response.data
  }

  @action.bound
  private registerSuccess(response: AxiosResponse) {
    this.userData = response.data
  }
}

export const userStore = new UserStore()
