import { Formik, FormikProps } from "formik"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { authStore } from "../../auth/stores/AuthStore"
import { preventDefault } from "../../common/helpers/react"
import { ModalState } from "../../modal/stores/ModalStore"
import { Button, Input, Label, PageSection, PageTitle, RaisedPanel, Shade } from "../../ui/elements"

type LoginFormValues = { emailOrUsername: string; password: string }

type Props = { modalState: ModalState }

@observer
export class LoginModal extends React.Component<Props> {
  @observable statusText = ""

  render() {
    return (
      <Shade onClick={this.handleShadeClick}>
        <RaisedPanel>
          <PageTitle>Log in</PageTitle>
          <PageSection>
            <Formik
              initialValues={{ emailOrUsername: "", password: "" }}
              onSubmit={this.handleSubmit}
              render={this.renderForm}
            />
          </PageSection>
          <PageSection style={{ width: "14rem" }}>{this.statusText}</PageSection>
        </RaisedPanel>
      </Shade>
    )
  }

  @action
  handleError = (error: string) => {
    this.statusText = error
  }

  handleSubmit = async (values: LoginFormValues) => {
    try {
      await authStore.signIn(values.emailOrUsername, values.password)
      this.props.modalState.hide()
    } catch (error) {
      this.handleError(error.message || String(error))
    }
  }

  renderForm = ({ values, handleChange, handleSubmit }: FormikProps<LoginFormValues>) => (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <Label>Email</Label>
        <Input
          name="emailOrUsername"
          type="text"
          placeholder="awesome-user"
          required
          value={values.emailOrUsername}
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
}
