import * as React from "react"

import { showError } from "./helpers/errorHelpers"
import { ModalOptions, modalStore } from "./ModalStore"
import { RegisterForm, RegisterFormProps } from "./RegisterForm"
import { userStore } from "./UserStore"

export const registerModal: ModalOptions = {
  render: modal => {
    const onSubmit: RegisterFormProps["onSubmit"] = values => {
      userStore
        .register(values)
        .then(modal.close)
        .catch(showError)
    }
    return <RegisterForm onSubmit={onSubmit} onCancel={modal.close} />
  },
}

export function showRegister() {
  modalStore.openModal(registerModal)
}
