import fuzzysearch from "fuzzysearch"
import React from "react"

import { Character } from "../../../api"
import { Input } from "../../../styles/formElements"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { FadedText } from "../../../styles/text"
import { CharacterListFetcher } from "../../components/CharacterListFetcher"
import { CharacterListItem } from "./CharacterListItem"

export class CharacterListPage extends React.Component {
  state = {
    search: "",
  }

  updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.currentTarget.value })
  }

  filterCharacter = (character: Character) => {
    const query = this.state.search.toLowerCase()
    const fields: Array<keyof Character> = ["name", "profile"]
    return fields.some(field => fuzzysearch(query, character[field].toLowerCase()))
  }

  render() {
    return (
      <PageWrapper>
        <PageTitle>Characters</PageTitle>

        <PageSection>
          <Input value={this.state.search} onChange={this.updateSearch} placeholder="Search..." />
        </PageSection>

        <CharacterListFetcher>{this.renderCharacters}</CharacterListFetcher>
      </PageWrapper>
    )
  }

  renderCharacters = (characters: Character[]) => {
    if (characters.length === 0) {
      return (
        <PageSection>
          <FadedText>
            <h2>Fetching characters...</h2>
          </FadedText>
        </PageSection>
      )
    }

    const filteredCharacters = characters.filter(this.filterCharacter)
    if (filteredCharacters.length === 0) {
      return (
        <PageSection>
          <FadedText>
            <h2>No results found.</h2>
          </FadedText>
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
