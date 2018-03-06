import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"

import { Character, getCharacter } from "./api"
import { CharacterEditForm } from "./CharacterEditForm"
import { routePaths } from "./routePaths"

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

        <Link to={routePaths.viewCharacter(character.id)} className="button is-link">
          Back
        </Link>
      </React.Fragment>
    )
  }
}
