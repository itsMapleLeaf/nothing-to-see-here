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

  async fetchCharacter(id: string) {
    this.setState({ character: null })
    const character = await getCharacter(id)
    this.setState({ character })
  }

  async componentDidMount() {
    this.fetchCharacter(this.props.match.params.id)
  }

  componentWillReceiveProps(props: Props) {
    if (props.match.params.id !== this.props.match.params.id) {
      this.fetchCharacter(props.match.params.id)
    }
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
