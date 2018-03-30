import { action, observable } from "mobx"

export class ModalState {
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
  login = new ModalState()
  register = new ModalState()
}

export const modalStore = new ModalStore()
