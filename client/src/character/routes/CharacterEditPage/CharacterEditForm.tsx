import React from "react"
import { Redirect } from "react-router-dom"
import { Character, updateCharacter } from "src/api"
import { routePaths } from "src/routePaths"

export class CharacterEditForm extends React.Component<{ character: Character }> {
  state = {
    name: this.props.character.name,
    profile: this.props.character.profile,
    saved: false,
  }

  changeHandler = (field: string) => (event: React.ChangeEvent<any>) => {
    this.setState({ [field]: event.currentTarget.value })
  }

  handleSubmit = async (event: React.FormEvent<any>) => {
    event.preventDefault()

    const { id } = this.props.character
    const { name, profile } = this.state
    await updateCharacter(id, { name, profile })
    this.setState({ saved: true })
  }

  render() {
    const { character } = this.props

    if (this.state.saved) {
      return <Redirect push to={routePaths.viewCharacter(character.id)} />
    }

    return (
      <React.Fragment>
        <h1 className="title">Editing {character.name}</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            className="pt-input"
            placeholder="My Awesome Character"
            value={this.state.name}
            onChange={this.changeHandler("name")}
          />

          <textarea
            placeholder="Introduce your character here! Who are they? What are they like? What have they done?"
            value={this.state.profile}
            onChange={this.changeHandler("profile")}
          />

          <button type="submit">Save</button>
        </form>
      </React.Fragment>
    )
  }
}
