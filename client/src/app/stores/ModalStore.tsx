import { action, observable } from "mobx"
import * as React from "react"

import { LoginModal } from "../../auth/components/LoginModal"

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

  render() {
    return <>{this.login.visible && <LoginModal modalState={this.login} />}</>
  }
}

export const modalStore = new ModalStore()
