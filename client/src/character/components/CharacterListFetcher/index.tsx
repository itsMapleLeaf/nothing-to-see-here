import React from "react"

import { Character, getCharacterList } from "../../../api"

interface Props {
  children: (characters: Character[]) => React.ReactNode
}

export class CharacterListFetcher extends React.Component<Props> {
  state = {
    characters: [] as Character[],
  }

  async componentDidMount() {
    this.setState({
      characters: await getCharacterList(),
    })
  }

  render() {
    return this.props.children(this.state.characters)
  }
}
