import { Formik } from "formik"
import * as React from "react"

import { authStore } from "../../../auth/stores/AuthStore"
import { appHistory } from "../../../history"
import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapperPanel } from "../../../ui/elements"
import { createCharacter } from "../../firebaseActions"
import { CharacterForm, CharacterFormValues } from "../CharacterForm"

export const CharacterCreatePage = () => {
  return (
    <PageWrapperPanel>
      <PageTitle>create new character</PageTitle>
      <PageSection>
        <Formik
          initialValues={{ name: "", description: "" }}
          render={props => (
            <CharacterForm
              values={props.values}
              onSubmit={props.handleSubmit}
              onChange={props.handleChange}
            />
          )}
          onSubmit={handleSubmit}
        />
      </PageSection>
    </PageWrapperPanel>
  )
}

const handleSubmit = async (values: CharacterFormValues) => {
  const { user } = authStore
  if (!user) return

  await createCharacter(user, {
    name: values.name,
    tagline: values.description,
  })

  appHistory.push(routePaths.characterList)
}
