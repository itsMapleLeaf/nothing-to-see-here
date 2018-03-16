import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-router-dom"

import { Icon } from "../../../app/components/Icon"
import { firebaseApp } from "../../../firebase"
import { routePaths } from "../../../routePaths"
import { Button, PageSection, PageTitle, PageWrapperPanel } from "../../../styles/elements"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class CharacterPage extends React.Component<{ id: string }> {
  @observable character: CharacterModel | null = null

  @action
  setCharacter = (character: CharacterModel) => {
    this.character = character
  }

  async componentDidMount() {
    const characterDoc = await firebaseApp
      .firestore()
      .collection("characters")
      .doc(this.props.id)
      .get()

    this.setCharacter(new CharacterModel(characterDoc))
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
