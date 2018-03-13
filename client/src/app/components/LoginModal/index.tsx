import { observer } from "mobx-react"
import * as React from "react"
import styled from "styled-components"

import { StoreConsumer } from "../../../storeContext"
import { Button, Input, Label } from "../../../styles/formElements"
import { PageSection, PageTitle, RaisedPanel } from "../../../styles/layout"

const Shade = styled.div`
  background-color: rgba(0, 0, 0, 0.3);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  transition: 0.3s;
`

type Props = {
  onSubmit: (email: string, password: string) => void
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
                <Button type="submit">Submit</Button>
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
      />
    )}
  </StoreConsumer>
)
