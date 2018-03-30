import { observer } from "mobx-react"
import * as React from "react"

import { LoginModal } from "../../app/components/LoginModal"
import { RegisterModal } from "../../app/components/RegisterModal"
import { modalStore } from "../stores/ModalStore"

@observer
export class ModalRenderer extends React.Component {
  render() {
    return (
      <>
        {modalStore.login.visible && <LoginModal modalState={modalStore.login} />}
        {modalStore.register.visible && <RegisterModal modalState={modalStore.register} />}
      </>
    )
  }
}
