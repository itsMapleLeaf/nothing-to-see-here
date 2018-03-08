import React from "react"

import { CharacterListFetcher } from "../../components/CharacterListFetcher"
import { CharacterListItem } from "./CharacterListItem"

export class CharacterListPage extends React.Component {
  render() {
    return (
      <CharacterListFetcher>
        {characters => (
          <React.Fragment>
            <h1>Characters</h1>
            {characters.map(character => (
              <CharacterListItem key={character.id} character={character} />
            ))}
          </React.Fragment>
        )}
      </CharacterListFetcher>
    )
  }
}
