import React from "react"
import { RouteComponentProps } from "react-router-dom"

import { Character, getCharacter } from "./api"
import { CharacterEditForm } from "./CharacterEditForm"

export class CharacterEditPage extends React.Component<RouteComponentProps<{ id: string }>> {
  state = {
    character: null as Character | null,
  }

  async componentDidMount() {
    this.setState({
      character: await getCharacter(this.props.match.params.id),
    })
  }

  render() {
    const { character } = this.state

    if (!character) {
      return <div>loading...</div>
    }

    return (
      <React.Fragment>
        <CharacterEditForm character={character} />
      </React.Fragment>
    )
  }
}
