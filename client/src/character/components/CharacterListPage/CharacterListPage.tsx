import fuzzysearch from "fuzzysearch"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"

import { StoreConsumer } from "../../../storeContext"
import {
  FadedText,
  Input,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../styles/elements"
import { CharacterModel } from "../../models/CharacterModel"
import { CharacterListItem } from "./CharacterListItem"

@observer
export class CharacterListPage extends React.Component {
  @observable searchText = ""

  @action
  updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.searchText = event.target.value
  }

  filterCharacter = (character: CharacterModel) => {
    const query = this.searchText.toLowerCase()
    const fields = ["name", "tagline"]
    return fields.some(field => fuzzysearch(query, character[field].toLowerCase()))
  }

  render() {
    return (
      <PageWrapperPanel>
        <PageTitle>Characters</PageTitle>

        <PageSection>
          <Input
            placeholder="Search..."
            value={this.searchText}
            onChange={this.updateSearch}
            autoFocus
          />
        </PageSection>

        <StoreConsumer>
          {({ characterListStore }) => this.renderCharacters(characterListStore.characters)}
        </StoreConsumer>
      </PageWrapperPanel>
    )
  }

  renderCharacters(characters: CharacterModel[]) {
    const filteredCharacters = characters.filter(this.filterCharacter)

    if (filteredCharacters.length === 0) {
      return (
        <PageSection>
          <FadedText>No results found :(</FadedText>
        </PageSection>
      )
    }

    return filteredCharacters.map(character => (
      <PageSection key={character.id}>
        <CharacterListItem character={character} />
      </PageSection>
    ))
  }
}