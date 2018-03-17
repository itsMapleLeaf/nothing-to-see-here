import { Formik } from "formik"
import * as React from "react"

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

export function LoginModal() {
  return (
    <Shade>
      <RaisedPanel>
        <PageTitle>Log in</PageTitle>
        <PageSection>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={values => {
              authStore.signIn(values.email, values.password)
              // TODO: hide modal
            }}
            render={({ values, handleChange, handleSubmit }) => (
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
                <Button type="submit">Log in</Button>{" "}
                <Button
                  flat
                  onClick={() => {
                    /* TODO: hide modal */
                  }}
                >
                  Cancel
                </Button>
              </form>
            )}
          />
        </PageSection>
      </RaisedPanel>
    </Shade>
  )
}
