import { Formik } from "formik"
import { History } from "history"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Route } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapperPanel } from "../../../ui/elements"
import { getCharacterById, updateCharacter } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"
import { CharacterForm, CharacterFormValues } from "../CharacterForm"

interface Props {
  id: string
}

@observer
export class CharacterEditPage extends React.Component<Props> {
  @observable character: CharacterModel | null = null

  @action
  setCharacter = (character: CharacterModel) => {
    this.character = character
  }

  async componentDidMount() {
    this.setCharacter(await getCharacterById(this.props.id))
  }

  render() {
    if (this.character === null) {
      return null
    }

    const character = this.character

    const initialValues: CharacterFormValues = {
      name: character.name,
      description: character.tagline,
    }

    return (
      <PageWrapperPanel>
        <PageTitle>editing {character.name}</PageTitle>
        <PageSection>
          <Route
            render={({ history }) => (
              <Formik
                initialValues={initialValues}
                render={props => (
                  <CharacterForm
                    values={props.values}
                    onSubmit={props.handleSubmit}
                    onChange={props.handleChange}
                  />
                )}
                onSubmit={createSubmitHandler(history, character)}
              />
            )}
          />
        </PageSection>
      </PageWrapperPanel>
    )
  }
}

const createSubmitHandler = (history: History, character: CharacterModel) => async (
  values: CharacterFormValues,
) => {
  const { user } = authStore
  if (!user) return

  await updateCharacter(character.id, {
    name: values.name,
    tagline: values.description,
  })

  history.push(routePaths.characterList)
}
