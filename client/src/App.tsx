import { bind } from "decko"
import { Field, Form, Formik, FormikProps } from "formik"
import { observer } from "mobx-react"
import * as React from "react"
import styled, { injectGlobal } from "react-emotion"
import { LoginDto } from "../../shared/user/types/login-dto"
import { NewUserData } from "../../shared/user/types/new-user-data"
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
          <Formik
            initialValues={{ username: "", email: "", password: "", displayName: "" }}
            render={(props: FormikProps<NewUserData>) => (
              <Form>
                <fieldset>
                  <label>username</label>
                  <Field name="username" type="text" required />
                </fieldset>
                <fieldset>
                  <label>email</label>
                  <Field name="email" type="email" required />
                </fieldset>
                <fieldset>
                  <label>password</label>
                  <Field name="password" type="password" required />
                </fieldset>
                <fieldset>
                  <label>displayName</label>
                  <Field name="displayName" type="text" required />
                </fieldset>
                <button type="submit">Register</button>
              </Form>
            )}
            onSubmit={this.handleRegisterSubmit}
          />
        </section>

        <section>
          <Formik
            initialValues={{ usernameOrEmail: "", password: "" }}
            render={(props: FormikProps<LoginDto>) => (
              <Form>
                <fieldset>
                  <label>Username or Email</label>
                  <Field name="usernameOrEmail" type="text" required />
                </fieldset>
                <fieldset>
                  <label>Password</label>
                  <Field name="password" type="password" required />
                </fieldset>
                <button type="submit">Log in</button>
              </Form>
            )}
            onSubmit={this.handleLoginSubmit}
          />
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
