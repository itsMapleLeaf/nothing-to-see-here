import { observer } from "mobx-react"
import * as React from "react"
import styled from "react-emotion"

import { AppHeader } from "./AppHeader"
import { LoginForm } from "./LoginForm"
import { Modal } from "./Modal"
import { modalStore } from "./ModalStore"
import { RegisterForm } from "./RegisterForm"
import { userStore } from "./UserStore"

const AppMain = styled.main`
  display: flex;
  flex-direction: column;

  height: 100vh;
`

@observer
export class App extends React.Component {
  render() {
    return (
      <AppMain>
        <AppHeader />

        {modalStore.login.visible && (
          <Modal onShadeClick={modalStore.login.hide}>
            <LoginForm onSubmit={userStore.login} />
          </Modal>
        )}

        {modalStore.register.visible && (
          <Modal onShadeClick={modalStore.register.hide}>
            <RegisterForm onSubmit={userStore.register} />
          </Modal>
        )}
      </AppMain>
    )
  }
}
