import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import {
  anchorPrimary,
  FadedText,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../ui/elements"
import { getAllCharacters } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class CharacterBrowsePage extends React.Component {
  @observable.ref characters: CharacterModel[] | null = null

  @action
  setCharacters = (characters: CharacterModel[]) => {
    this.characters = characters.sort((a, b) => a.name.localeCompare(b.name))
  }

  fetchCharacters = async () => {
    const { user } = authStore
    if (!user) return
    this.setCharacters(await getAllCharacters(10))
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
        <PageTitle>all characters</PageTitle>

        {this.characters.length === 0 && (
          <PageSection>
            <FadedText>No results found.</FadedText>
          </PageSection>
        )}

        {this.characters.map(entry => (
          <PageSection key={entry.id}>
            <Link className={anchorPrimary} to={routePaths.viewCharacter(entry.id)}>
              <h2>{entry.name}</h2>
            </Link>
            <p>{entry.tagline}</p>
          </PageSection>
        ))}
      </PageWrapperPanel>
    )
  }
}