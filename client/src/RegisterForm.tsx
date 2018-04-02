import { Field, Form, Formik, FormikProps } from "formik"
import * as React from "react"
import { NewUserData } from "../../shared/user/types/new-user-data"

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
      onSubmit={props.onSubmit}
    />
  )
}
