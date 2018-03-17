import { action, observable } from "mobx"
import * as React from "react"

import { LoginModal } from "../../auth/components/LoginModal"
import { RegisterModal } from "../../auth/components/RegisterModal"

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
  @observable login = new ModalState()
  @observable register = new ModalState()

  render() {
    return (
      <>
        {this.login.visible && <LoginModal modalState={this.login} />}
        {this.register.visible && <RegisterModal modalState={this.register} />}
      </>
    )
  }
}

export const modalStore = new ModalStore()
