import Axios, { AxiosResponse } from "axios"
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

export class UserStore {
  @observable.ref userData?: ClientUserData

  login({ usernameOrEmail, password }: LoginDto) {
    return api.post("/login", { usernameOrEmail, password }).then(this.setUserDataFromAxiosResponse)
  }

  logout() {
    if (this.userData) {
      return api.post("/logout", { username: this.userData.username }).then(this.clearUserData)
    }
  }

  register(newUserData: NewUserData) {
    return api.post("/register", newUserData).then(this.setUserDataFromAxiosResponse)
  }

  @action.bound
  private clearUserData() {
    this.userData = undefined
  }

  @action.bound
  private setUserDataFromAxiosResponse(response: AxiosResponse) {
    this.userData = response.data
  }
}

export const userStore = new UserStore()
