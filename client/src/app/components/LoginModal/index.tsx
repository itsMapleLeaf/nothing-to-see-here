import { observer } from "mobx-react"
import * as React from "react"

import { StoreConsumer } from "../../../storeContext"
import { Button, Input, Label } from "../../../styles/elements/formElements"
import { PageSection, PageTitle, RaisedPanel } from "../../../styles/elements/layout"
import { Shade } from "../../../styles/elements/shade"

type Props = {
  onSubmit: (email: string, password: string) => void
  onClose: () => void
}

@observer
class LoginForm extends React.Component<Props> {
  state = {
    email: "",
    password: "",
  }

  handleSubmit = (event: React.FormEvent<{}>) => {
    event.preventDefault()
    this.props.onSubmit(this.state.email, this.state.password)
  }

  render() {
    return (
      <Shade>
        <RaisedPanel>
          <PageTitle>Log in</PageTitle>

          <PageSection>
            <form onSubmit={this.handleSubmit}>
              <fieldset>
                <Label>Email</Label>
                <Input
                  required
                  type="email"
                  placeholder="awesome@email.com"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.currentTarget.value })}
                />
              </fieldset>

              <fieldset>
                <Label>Password</Label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.currentTarget.value })}
                />
              </fieldset>

              <fieldset>
                <Button type="submit">Submit</Button>{' '}
                <Button flat onClick={() => this.props.onClose()} >Go back</Button>
              </fieldset>
            </form>
          </PageSection>
        </RaisedPanel>
      </Shade>
    )
  }
}

export const LoginModal = () => (
  <StoreConsumer>
    {stores => (
      <LoginForm
        onSubmit={(email, password) => {
          stores.authStore
            .signIn(email, password)
            .then(() => {
              stores.appViewStore.hideLogin()
            })
            .catch(error => {
              alert(error)
            })
        }}
        onClose={() => {
          stores.appViewStore.hideLogin()
        }}
      />
    )}
  </StoreConsumer>
)
