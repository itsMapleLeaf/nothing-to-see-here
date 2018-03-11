import { observer } from "mobx-react"
import React from "react"
import { Redirect } from "react-router"

import { AuthStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { Button, Input, Label } from "../../../styles/formElements"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"

// TODO: this should probably be a modal
@observer
export class LoginPage extends React.Component<{ authStore: AuthStore }> {
  state = {
    email: "",
    password: "",
  }

  handleSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault()

    this.props.authStore.signIn(this.state.email, this.state.password).catch(error => {
      alert(error)
    })
  }

  render() {
    if (this.props.authStore.isSignedIn) {
      return <Redirect to={routePaths.home} />
    }

    return (
      <PageWrapper>
        <PageTitle>Log in</PageTitle>

        <PageSection>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="awesome@email.com"
                value={this.state.email}
                onChange={event => this.setState({ email: event.currentTarget.value })}
              />
            </fieldset>

            <fieldset>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={this.state.password}
                onChange={event => this.setState({ password: event.currentTarget.value })}
              />
            </fieldset>

            <fieldset>
              <Button type="submit">Submit</Button>
            </fieldset>
          </form>
        </PageSection>
      </PageWrapper>
    )
  }
}

export const LoginPageContainer = () => (
  <StoreConsumer>{stores => <LoginPage authStore={stores.authStore} />}</StoreConsumer>
)
