import { observer } from "mobx-react"
import * as React from "react"
import styled from "react-emotion"

import { AppHeader } from "./AppHeader"
import { Modal } from "./Modal"

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
        <Modal>
          aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaa
        </Modal>
      </AppMain>
    )
  }
}
