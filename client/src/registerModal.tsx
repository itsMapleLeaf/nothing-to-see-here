import * as React from "react"

import { modalCatchHandler } from "./errorModal"
import { ModalOptions, modalStore } from "./ModalStore"
import { RegisterForm, RegisterFormProps } from "./RegisterForm"
import { userStore } from "./UserStore"

export const registerModal: ModalOptions = {
  render: modal => {
    const onSubmit: RegisterFormProps["onSubmit"] = async values => {
      userStore
        .register(values)
        .then(modal.close)
        .catch(modalCatchHandler)
    }
    return <RegisterForm onSubmit={onSubmit} onCancel={modal.close} />
  },
}

export function showRegister() {
  modalStore.openModal(registerModal)
}
