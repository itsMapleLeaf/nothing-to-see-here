import { Button, Card, Classes, Intent, Label, TextArea } from "@blueprintjs/core"
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

        <Card>
          <form onSubmit={this.handleSubmit}>
            <Label text="Name">
              <input
                className="pt-input"
                placeholder="My Awesome Character"
                value={this.state.name}
                onChange={this.changeHandler("name")}
              />
            </Label>

            <Label text="Profile">
              <TextArea
                className={Classes.FILL}
                placeholder="Introduce your character here! Who are they? What are they like? What have they done?"
                value={this.state.profile}
                onChange={this.changeHandler("profile")}
                style={{ height: "180px" }}
              />
            </Label>

            <Button type="submit" intent={Intent.PRIMARY}>
              Save
            </Button>
          </form>
        </Card>
      </React.Fragment>
    )
  }
}
