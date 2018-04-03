import React from "react"

import { modalCatchHandler } from "./errorModal"
import { LoginForm, LoginFormProps } from "./LoginForm"
import { ModalOptions, modalStore } from "./ModalStore"
import { userStore } from "./UserStore"

export const loginModal: ModalOptions = {
  render: modal => {
    const onSubmit: LoginFormProps["onSubmit"] = values => {
      userStore
        .login(values)
        .then(modal.close)
        .catch(modalCatchHandler)
    }
    return <LoginForm onSubmit={onSubmit} onCancel={modal.close} />
  },
}

export function showLogin() {
  modalStore.openModal(loginModal)
}
