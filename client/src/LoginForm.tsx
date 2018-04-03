import { Field, Form, Formik, FormikProps } from "formik"
import * as React from "react"

import { LoginDto } from "../../shared/user/types/login-dto"
import { Button } from "./style/button"
import { Input } from "./style/input"

const StyledField = Input.withComponent(Field as any)

export interface LoginFormProps {
  onSubmit: (values: LoginDto) => void
  onCancel: () => void
}

export function LoginForm(props: LoginFormProps) {
  return (
    <Formik
      initialValues={{ usernameOrEmail: "", password: "" }}
      render={(formikProps: FormikProps<LoginDto>) => (
        <Form>
          <fieldset>
            <label>Username or Email</label>
            <StyledField
              name="usernameOrEmail"
              type="text"
              placeholder="awesome@email.com"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <StyledField name="password" type="password" placeholder="••••••••" required />
          </fieldset>
          <fieldset>
            <Button type="submit">Log in</Button>
            <Button flat type="button" onClick={props.onCancel}>
              Cancel
            </Button>
          </fieldset>
        </Form>
      )}
      onSubmit={props.onSubmit}
    />
  )
}
