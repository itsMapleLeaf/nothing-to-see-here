import fuzzysearch from "fuzzysearch"
import React from "react"
import styled from "styled-components"

import { Character } from "../../../api"
import { Input } from "../../../styles/formElements"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { CharacterListFetcher } from "../../components/CharacterListFetcher"
import { CharacterListItem } from "./CharacterListItem"

const CharacterList = styled(PageSection)`
  > * + * {
    margin-top: 1rem;
  }
`

export class CharacterListPage extends React.Component {
  state = {
    search: "",
  }

  updateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: event.currentTarget.value })
  }

  filterCharacter = (character: Character) => {
    const search = this.state.search.toLowerCase()
    return (
      fuzzysearch(search, character.name.toLowerCase()) ||
      fuzzysearch(search, character.profile.toLowerCase())
    )
  }

  render() {
    return (
      <PageWrapper>
        <PageTitle>Characters</PageTitle>

        <PageSection>
          <Input value={this.state.search} onChange={this.updateSearch} placeholder="Search..." />
        </PageSection>

        <CharacterListFetcher>
          {characters => (
            <CharacterList>
              {characters
                .filter(this.filterCharacter)
                .map(character => <CharacterListItem key={character.id} character={character} />)}
            </CharacterList>
          )}
        </CharacterListFetcher>
      </PageWrapper>
    )
  }
}
