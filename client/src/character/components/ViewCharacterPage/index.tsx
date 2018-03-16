import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { Icon } from "../../../app/components/Icon"
import { firebaseApp } from "../../../firebase"
import { Button, PageSection, PageTitle, PageWrapperPanel } from "../../../styles/elements"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class ViewCharacterPage extends React.Component<{ id: string }> {
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
          <Button flat onClick={() => alert("not implemented")}>
            <Icon name="edit" /> Edit
          </Button>
          <Button flat onClick={() => alert("not implemented")}>
            <Icon name="trash" /> Delete
          </Button>
        </PageSection>
      </PageWrapperPanel>
    )
  }
}
