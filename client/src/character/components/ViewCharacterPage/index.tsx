import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { firebaseApp } from "../../../firebase"
import { PageSection, PageTitle, PageWrapperPanel } from "../../../styles/elements"
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
      </PageWrapperPanel>
    )
  }
}
