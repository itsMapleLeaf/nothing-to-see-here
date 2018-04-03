import { action, observable } from "mobx"

export class ModalViewModel {
  @observable visible = false

  @action.bound
  show() {
    this.visible = true
  }

  @action.bound
  hide() {
    this.visible = false
  }

  @action.bound
  toggle() {
    this.visible = !this.visible
  }
}

export class ModalStore {
  login = new ModalViewModel()
  register = new ModalViewModel()
}

export const modalStore = new ModalStore()
