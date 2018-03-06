import React from "react"
import { Redirect } from "react-router-dom"

import { Character, updateCharacter } from "../../../../api"
import { routePaths } from "../../../../routePaths"

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

        <form className="box" onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="e.g Alex Smith"
                defaultValue={character.name}
                onChange={this.changeHandler("name")}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Profile</label>
            <textarea
              className="textarea"
              placeholder="Introduce your character here! Who are they? What are they like? What have they done?"
              defaultValue={character.profile}
              onChange={this.changeHandler("profile")}
            />
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success">Save</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}
