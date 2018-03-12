import React from "react"
import { Redirect } from "react-router-dom"

import { routePaths } from "../../../routePaths"
import { Button, Input, Label, TextArea } from "../../../styles/formElements"
import { CharacterModel } from "../../models/CharacterModel"

export class CharacterEditForm extends React.Component<{ character: CharacterModel }> {
  state = {
    name: this.props.character.name,
    tagline: this.props.character.tagline,
    saved: false,
  }

  changeHandler = (field: string) => (event: React.ChangeEvent<{ value: string }>) => {
    this.setState({ [field]: event.currentTarget.value })
  }

  handleSubmit = async (event: React.FormEvent<{}>) => {
    event.preventDefault()
    this.setState({ saved: true })
  }

  render() {
    const { character } = this.props

    if (this.state.saved) {
      return <Redirect push to={routePaths.viewCharacter(character.id)} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <Label>Name</Label>
          <Input
            required
            placeholder="My Awesome Character"
            value={this.state.name}
            onChange={this.changeHandler("name")}
          />
        </fieldset>

        <fieldset>
          <Label>Tagline</Label>
          <TextArea
            height={180}
            placeholder="Introduce your character here! Who are they? What are they like? What have they done?"
            value={this.state.tagline}
            onChange={this.changeHandler("tagline")}
          />
        </fieldset>

        <fieldset>
          <Button type="submit">Save</Button>
        </fieldset>
      </form>
    )
  }
}
