import { action, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Redirect } from "react-router-dom"

import { routePaths } from "../../../routePaths"
import { Button, Input, Label, TextArea } from "../../../styles/elements"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class CharacterEditForm extends React.Component<{ character: CharacterModel }> {
  @observable
  fields = {
    name: this.props.character.name,
    tagline: this.props.character.tagline,
  }

  @observable saved = false

  @action
  handleChange = (event: React.ChangeEvent<{ name: string; value: string }>) => {
    const { name, value } = event.currentTarget
    this.fields[name] = value
  }

  @action
  handleSubmit = (event: React.FormEvent<{}>) => {
    event.preventDefault()
    this.saved = true
  }

  render() {
    const { character } = this.props

    if (this.saved) {
      return <Redirect push to={routePaths.viewCharacter(character.id)} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <Label>Name</Label>
          <Input
            name="name"
            required
            placeholder="My Awesome Character"
            value={this.fields.name}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <Label>Tagline</Label>
          <TextArea
            name="tagline"
            height={180}
            placeholder="Enter a short, snappy description of your character."
            value={this.fields.tagline}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <Button type="submit">Save</Button>
        </fieldset>
      </form>
    )
  }
}
