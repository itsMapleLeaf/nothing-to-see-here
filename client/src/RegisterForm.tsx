import { Field, Form, Formik, FormikProps } from "formik"
import * as React from "react"

import { NewUserData } from "../../shared/user/types/new-user-data"
import { Button } from "./style/button"
import { Input } from "./style/input"

const StyledField = Input.withComponent(Field as any)

interface RegisterFormProps {
  onSubmit: (values: NewUserData) => void
}

export function RegisterForm(props: RegisterFormProps) {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", displayName: "" }}
      render={(formikProps: FormikProps<NewUserData>) => (
        <Form>
          <fieldset>
            <label>Username</label>
            <StyledField name="username" type="text" placeholder="awesomesan" required autoFocus />
          </fieldset>
          <fieldset>
            <label>Email</label>
            <StyledField name="email" type="email" placeholder="awesome@email.com" required />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <StyledField name="password" type="password" placeholder="••••••••••••••••" required />
          </fieldset>
          <fieldset>
            <label>Display Name</label>
            <StyledField name="displayName" type="text" placeholder="Awesome San" required />
          </fieldset>
          <fieldset>
            <Button type="submit">Register</Button>
            <Button flat type="button">
              Cancel
            </Button>
          </fieldset>
        </Form>
      )}
      onSubmit={props.onSubmit}
    />
  )
}
