import { Formik } from "formik"
import { History } from "history"
import * as React from "react"
import { Route } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapperPanel } from "../../../ui/elements"
import { createCharacter } from "../../firebaseActions"
import { CharacterForm, CharacterFormValues } from "../CharacterForm"

export const CharacterCreatePage = () => {
  return (
    <PageWrapperPanel>
      <PageTitle>create new character</PageTitle>
      <PageSection>
        <Route
          render={({ history }) => (
            <Formik
              initialValues={{ name: "", description: "" }}
              render={props => (
                <CharacterForm
                  values={props.values}
                  onSubmit={props.handleSubmit}
                  onChange={props.handleChange}
                />
              )}
              onSubmit={createSubmitHandler(history)}
            />
          )}
        />
      </PageSection>
    </PageWrapperPanel>
  )
}

const createSubmitHandler = (history: History) => async (values: CharacterFormValues) => {
  const { user } = authStore
  if (!user) return

  await createCharacter(user, {
    name: values.name,
    tagline: values.description,
  })

  history.push(routePaths.characterList)
}
