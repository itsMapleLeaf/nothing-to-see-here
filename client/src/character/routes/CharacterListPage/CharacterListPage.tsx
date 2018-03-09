import React from "react"
import { PageSection, PageTitle, PageWrapper } from "src/styles/layout"
import styled from "styled-components"

import { CharacterListFetcher } from "../../components/CharacterListFetcher"
import { CharacterListItem } from "./CharacterListItem"

const CharacterList = styled(PageSection)`
  > * + * {
    margin-top: 1rem;
  }
`

export class CharacterListPage extends React.Component {
  render() {
    return (
      <PageWrapper>
        <PageTitle>Characters</PageTitle>

        <CharacterListFetcher>
          {characters => (
            <CharacterList>
              {characters.map(character => (
                <CharacterListItem key={character.id} character={character} />
              ))}
            </CharacterList>
          )}
        </CharacterListFetcher>
      </PageWrapper>
    )
  }
}
