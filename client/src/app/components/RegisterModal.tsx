import { Formik, FormikProps } from "formik"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { preventDefault } from "../../common/helpers/react"
import { ModalState } from "../../modal/stores/ModalStore"
import { Button, Input, Label, PageSection, PageTitle, RaisedPanel, Shade } from "../../ui/elements"

type RegisterFormValues = {
  username: string
  displayName: string
  email: string
  password: string
}

type Props = {
  modalState: ModalState
}

@observer
export class RegisterModal extends React.Component<Props> {
  @observable statusText = ""

  @action
  handleError = (error: string) => {
    this.statusText = error
  }

  handleSubmit = async (values: RegisterFormValues) => {
    // const result = await authStore.register(values)
    // if (result.success) {
    //   this.props.modalState.hide()
    // } else {
    //   this.handleError(result.error)
    // }
  }

  renderForm = ({ values, handleChange, handleSubmit }: FormikProps<RegisterFormValues>) => (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <Label>Username</Label>
        <Input
          name="username"
          type="text"
          placeholder="awesome san"
          required
          value={values.username}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <Label>Display Name</Label>
        <Input
          name="displayName"
          type="text"
          placeholder="awesome-san"
          required
          value={values.displayName}
          onChange={handleChange}
        />
      </fieldset>

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
        <Button type="submit">Register</Button>{" "}
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
          <PageTitle>Create new account</PageTitle>
          <PageSection>
            <Formik
              initialValues={{ username: "", email: "", password: "", displayName: "" }}
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
