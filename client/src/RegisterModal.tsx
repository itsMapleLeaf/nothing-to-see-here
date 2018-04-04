import * as React from "react"

import { extractErrorMessage } from "./helpers/errorHelpers"
import { Modal } from "./Modal"
import { RegisterForm, RegisterFormProps } from "./RegisterForm"
import { userStore } from "./UserStore"

export interface RegisterModalProps {
  onClose: () => void
}

export class RegisterModal extends React.Component<RegisterModalProps> {
  render() {
    return (
      <Modal onShadeClick={this.props.onClose}>
        <RegisterForm onSubmit={this.handleSubmit} onCancel={this.props.onClose} />
      </Modal>
    )
  }

  handleSubmit: RegisterFormProps["onSubmit"] = values => {
    userStore
      .register(values)
      .then(this.props.onClose)
      .catch(error => {
        alert(extractErrorMessage(error))
      })
  }
}
