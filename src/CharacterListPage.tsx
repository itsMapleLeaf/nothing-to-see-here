import React from "react"

import { Character, getCharacterList } from "./api"
import { CharacterListItem } from "./CharacterListItem"

export class CharacterListPage extends React.Component {
  state = {
    characters: [] as Character[],
  }

  async componentDidMount() {
    this.setState({
      characters: await getCharacterList(),
    })
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="title is-2">Characters</h1>
        {this.state.characters.map(character => (
          <CharacterListItem key={character.id} character={character} />
        ))}
      </React.Fragment>
    )
  }
}
