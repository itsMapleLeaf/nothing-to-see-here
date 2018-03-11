import fuzzysearch from "fuzzysearch"
import { action, observable } from "mobx"
import { inject, observer } from "mobx-react"
import React from "react"

import { Input } from "../../../styles/formElements"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { FadedText } from "../../../styles/text"
import { CharacterListStore } from "../../stores/CharacterListStore"
import { CharacterListItem } from "./CharacterListItem"

interface Props {
  characterListStore?: CharacterListStore
}

@inject("characterListStore")
@observer
export class CharacterListPage extends React.Component<Props> {
  @observable searchText = ""

  @action
  updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.searchText = event.target.value
  }

  filterCharacter = (character: any) => {
    const query = this.searchText.toLowerCase()
    const fields = ["name", "tagline"]
    return fields.some(field => fuzzysearch(query, character[field].toLowerCase()))
  }

  render() {
    return (
      <PageWrapper>
        <PageTitle>Characters</PageTitle>

        <PageSection>
          <Input placeholder="Search..." value={this.searchText} onChange={this.updateSearch} />
        </PageSection>

        {this.renderCharacters()}
      </PageWrapper>
    )
  }

  renderCharacters() {
    const characters = this.props.characterListStore!.characters

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
