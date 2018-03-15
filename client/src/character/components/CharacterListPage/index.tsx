import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { authStore } from "../../../auth/stores/AuthStore"
import { firebaseApp } from "../../../firebase"
import { routePaths } from "../../../routePaths"
import {
  PageSection,
  PageTitle,
  PageWrapperPanel,
  StyledRouterLink,
} from "../../../styles/elements"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class CharacterListPage extends React.Component {
  @observable.ref characters: CharacterModel[] | null = null

  @action
  handleFetchResult = (characters: CharacterModel[]) => {
    this.characters = characters.sort((a, b) => a.name.localeCompare(b.name))
  }

  fetchCharacters = async () => {
    const { user } = authStore
    if (!user) return

    const result = await firebaseApp
      .firestore()
      .collection("characters")
      .where("owner", "==", user.uid)
      .get()

    this.handleFetchResult(result.docs.map(doc => new CharacterModel(doc)))
  }

  componentDidMount() {
    this.fetchCharacters()
  }

  render() {
    if (!this.characters) {
      return null
    }

    return (
      <PageWrapperPanel>
        <PageTitle>your characters</PageTitle>
        {this.characters.map(entry => (
          <PageSection key={entry.id}>
            <StyledRouterLink to={routePaths.viewCharacter(entry.id)}>
              <h2>{entry.name}</h2>
            </StyledRouterLink>
            <p>{entry.tagline}</p>
          </PageSection>
        ))}
      </PageWrapperPanel>
    )
  }
}
