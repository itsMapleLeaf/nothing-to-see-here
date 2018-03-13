import { action, observable } from "mobx"

export class AppViewStore {
  @observable loginVisible = false

  @action
  showLogin = () => {
    this.loginVisible = true
  }

  @action
  hideLogin = () => {
    this.loginVisible = false
  }

  @action
  toggleLogin = () => {
    this.loginVisible = !this.loginVisible
  }
}
