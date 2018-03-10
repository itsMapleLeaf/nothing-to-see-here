import React from "react"
import styled from "styled-components"

import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
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
