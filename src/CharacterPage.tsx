import React from "react"
import { RouteComponentProps } from "react-router"
import { Link } from "react-router-dom"

import { Character, getCharacter } from "./api"
import { routePaths } from "./routePaths"

type Props = RouteComponentProps<{ id: string }>

export class CharacterPage extends React.Component<Props> {
  state = {
    character: null as Character | null,
  }

  async componentDidMount() {
    const character = await getCharacter(this.props.match.params.id)
    this.setState({ character })
  }

  render() {
    const { character } = this.state

    if (!character) {
      return <div>loading...</div>
    }

    return (
      <main>
        <h1 className="title">{character.name}</h1>
        <section style={{ marginBottom: "1.5em" }}>
          <Link to={routePaths.editCharacter(character.id)}>Edit</Link>
        </section>
        <section className="box">{character.profile}</section>
      </main>
    )
  }
}
