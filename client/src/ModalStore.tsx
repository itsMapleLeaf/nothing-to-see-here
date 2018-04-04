import { action, observable } from "mobx"
import React from "react"

import { LoginModal } from "./LoginModal"
import { RegisterModal } from "./RegisterModal"

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

  renderModals() {
    return (
      <React.Fragment>
        {this.login.visible && <LoginModal onClose={this.login.hide} />}
        {this.register.visible && <RegisterModal onClose={this.register.hide} />}
      </React.Fragment>
    )
  }
}

export const modalStore = new ModalStore()
