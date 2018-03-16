import { Formik, FormikProps } from "formik"
import { History } from "history"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Route } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import {
  Button,
  Input,
  Label,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../ui/elements"
import { getCharacterById, updateCharacter } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

interface FormValues {
  name: string
  description: string
}

class CharacterEditForm extends Formik<{}, FormValues> {}

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

    const initialValues: FormValues = {
      name: character.name,
      description: character.tagline,
    }

    return (
      <PageWrapperPanel>
        <PageTitle>editing {character.name}</PageTitle>
        <PageSection>
          <Route
            render={({ history }) => (
              <CharacterEditForm
                initialValues={initialValues}
                render={renderForm}
                onSubmit={createSubmitHandler(history, character)}
              />
            )}
          />
        </PageSection>
      </PageWrapperPanel>
    )
  }
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

const createSubmitHandler = (history: History, character: CharacterModel) => async (
  values: FormValues,
) => {
  const { user } = authStore
  if (!user) return

  await updateCharacter(character.id, {
    name: values.name,
    tagline: values.description,
  })

  history.push(routePaths.characterList)
}
