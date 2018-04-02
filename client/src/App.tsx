import { bind } from "decko"
import { observer } from "mobx-react"
import * as React from "react"
import styled, { injectGlobal } from "react-emotion"
import { LoginDto } from "../../shared/user/types/login-dto"
import { NewUserData } from "../../shared/user/types/new-user-data"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { userStore } from "./UserStore"

injectGlobal`
  :root {
    background-color: rgb(24, 40, 58);
    color: rgb(236, 240, 241);
    font: 18px Roboto, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Condensed';
    font-weight: 300;
  }
`

const AppMain = styled.main`
  padding: 0 1rem;
  margin: auto;
  max-width: 1200px;
`

@observer
export class App extends React.Component {
  render() {
    return (
      <AppMain>
        <header>
          <h1>awesome website</h1>
          {userStore.userData && <h2>logged in as {userStore.userData.displayName}</h2>}
          <div>
            <button onClick={() => userStore.logout()}>Log out</button>
          </div>
        </header>

        <section>
          <RegisterForm onSubmit={this.handleRegisterSubmit} />
        </section>

        <section>
          <LoginForm onSubmit={this.handleLoginSubmit} />
        </section>
      </AppMain>
    )
  }

  @bind
  handleRegisterSubmit(fields: NewUserData) {
    userStore.register(fields)
  }

  @bind
  handleLoginSubmit(fields: LoginDto) {
    userStore.login(fields)
  }
}
