import { Formik, FormikProps } from "formik"
import { History } from "history"
import * as React from "react"
import { Route } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { firebaseApp } from "../../../firebase"
import { routePaths } from "../../../routePaths"
import {
  Button,
  Input,
  Label,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../styles/elements"

interface FormValues {
  name: string
  description: string
}

class NewCharacterForm extends Formik<{}, FormValues> {}

export const CharacterCreatePage = () => {
  return (
    <PageWrapperPanel>
      <PageTitle>create new character</PageTitle>
      <PageSection>
        <Route
          render={({ history }) => (
            <NewCharacterForm
              initialValues={{ name: "", description: "" }}
              render={renderForm}
              onSubmit={createSubmitHandler(history)}
            />
          )}
        />
      </PageSection>
    </PageWrapperPanel>
  )
}

const renderForm = (props: FormikProps<FormValues>) => (
  <form onSubmit={props.handleSubmit}>
    <fieldset>
      <Label>Name</Label>
      <Input
        name="name"
        placeholder="awesome-san"
        value={props.values.name}
        onChange={props.handleChange}
      />
    </fieldset>

    <fieldset>
      <Label>Description</Label>
      <Input
        name="description"
        placeholder="an awesome character that does awesome things"
        value={props.values.description}
        onChange={props.handleChange}
      />
    </fieldset>

    <fieldset>
      <Button>Submit</Button>
    </fieldset>
  </form>
)

const createSubmitHandler = (history: History) => async (values: FormValues) => {
  const { user } = authStore
  if (!user) return

  await firebaseApp
    .firestore()
    .collection("characters")
    .doc()
    .set({
      name: values.name,
      tagline: values.description,
      owner: user.uid,
    })

  history.push(routePaths.characterList)
}
