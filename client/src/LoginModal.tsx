import * as React from "react"

import { extractErrorMessage } from "./helpers/errorHelpers"
import { LoginForm, LoginFormProps } from "./LoginForm"
import { Modal } from "./Modal"
import { userStore } from "./UserStore"

export interface LoginModalProps {
  onClose: () => void
}

export class LoginModal extends React.Component<LoginModalProps> {
  render() {
    return (
      <Modal onShadeClick={this.props.onClose}>
        <LoginForm onSubmit={this.handleSubmit} onCancel={this.props.onClose} />
      </Modal>
    )
  }

  handleSubmit: LoginFormProps["onSubmit"] = values => {
    userStore
      .login(values)
      .then(this.props.onClose)
      .catch(error => {
        alert(extractErrorMessage(error))
      })
  }
}
