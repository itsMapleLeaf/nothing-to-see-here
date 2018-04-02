import { Field, Form, Formik, FormikProps } from "formik"
import * as React from "react"
import { LoginDto } from "../../shared/user/types/login-dto"

interface LoginFormProps {
  onSubmit: (values: LoginDto) => void
}

export function LoginForm(props: LoginFormProps) {
  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      render={(formikProps: FormikProps<LoginDto>) => (
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
      onSubmit={props.onSubmit}
    />
  )
}
