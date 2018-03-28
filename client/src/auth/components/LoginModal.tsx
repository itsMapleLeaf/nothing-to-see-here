import { Formik, FormikProps } from "formik"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { ModalState } from "../../app/stores/ModalStore"
import { preventDefault } from "../../common/helpers/react"
import { Button, Input, Label, PageSection, PageTitle, RaisedPanel, Shade } from "../../ui/elements"
import { authStore } from "../stores/AuthStore"

type LoginFormValues = { email: string; password: string }

type Props = { modalState: ModalState }

@observer
export class LoginModal extends React.Component<Props> {
  @observable statusText = ""

  @action
  handleError = (error: string) => {
    this.statusText = error
  }

  handleSubmit = async (values: LoginFormValues) => {
    const result = await authStore.signIn(values.email, values.password)
    if (result.success) {
      this.props.modalState.hide()
    } else {
      this.handleError(result.error)
    }
  }

  renderForm = ({ values, handleChange, handleSubmit }: FormikProps<LoginFormValues>) => (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="awesome@email.com"
          required
          value={values.email}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          value={values.password}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <Button type="submit">Log in</Button>{" "}
        <Button flat onClick={preventDefault(this.props.modalState.hide)}>
          Cancel
        </Button>
      </fieldset>
    </form>
  )

  handleShadeClick = (event: React.MouseEvent<{}>) => {
    if (event.target === event.currentTarget) {
      this.props.modalState.hide()
    }
  }

  render() {
    return (
      <Shade onClick={this.handleShadeClick}>
        <RaisedPanel>
          <PageTitle>Log in</PageTitle>
          <PageSection>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />
          </PageSection>
          <PageSection style={{ width: "14rem" }}>{this.statusText}</PageSection>
        </RaisedPanel>
      </Shade>
    )
  }
}
