import { observer } from "mobx-react"
import * as React from "react"
import styled from "react-emotion"

import { AppHeader } from "./AppHeader"

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

        {/* <section>
          <RegisterForm onSubmit={userStore.register} />
        </section>

        <section>
          <LoginForm onSubmit={userStore.login} />
        </section> */}
      </AppMain>
    )
  }
}
