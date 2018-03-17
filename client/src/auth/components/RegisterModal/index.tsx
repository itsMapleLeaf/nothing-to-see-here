import { Formik, FormikProps } from "formik"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { ModalState } from "../../../app/stores/ModalStore"
import {
  Button,
  Input,
  Label,
  PageSection,
  PageTitle,
  RaisedPanel,
  Shade,
} from "../../../ui/elements"
import { authStore } from "../../stores/AuthStore"

type RegisterFormValues = {
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
    const result = await authStore.register(values)
    if (result.success) {
      this.props.modalState.hide()
    } else {
      this.handleError(result.error)
    }
  }

  renderForm = ({ values, handleChange, handleSubmit }: FormikProps<RegisterFormValues>) => (
    <form onSubmit={handleSubmit}>
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
      <Button type="submit">Register</Button>{" "}
      <Button flat onClick={this.props.modalState.hide}>
        Cancel
      </Button>
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
              initialValues={{ email: "", password: "", displayName: "" }}
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
