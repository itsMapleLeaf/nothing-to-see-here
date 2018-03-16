import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-router-dom"

import { Icon } from "../../../app/components/Icon"
import { routePaths } from "../../../routePaths"
import { Button, PageSection, PageTitle, PageWrapperPanel } from "../../../styles/elements"
import { getCharacterById } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class CharacterPage extends React.Component<{ id: string }> {
  @observable character: CharacterModel | null = null

  @action
  setCharacter = (character: CharacterModel) => {
    this.character = character
  }

  async componentDidMount() {
    this.setCharacter(await getCharacterById(this.props.id))
  }

  render() {
    if (!this.character) {
      return null
    }

    return (
      <PageWrapperPanel>
        <PageTitle>{this.character.name}</PageTitle>
        <PageSection>{this.character.tagline}</PageSection>
        <hr />
        <PageSection>
          <Link to={routePaths.editCharacter(this.character.id)}>
            <Button flat>
              <Icon name="edit" /> Edit
            </Button>
          </Link>
          <Button flat onClick={() => alert("not implemented")}>
            <Icon name="trash" /> Delete
          </Button>
        </PageSection>
      </PageWrapperPanel>
    )
  }
}
