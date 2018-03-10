import React from "react"
import { Redirect } from "react-router-dom"

import { Character, updateCharacter } from "../../../api"
import { routePaths } from "../../../routePaths"
import { Button, Input, Label, TextArea } from "../../../styles/formElements"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"

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
      <PageWrapper>
        <PageTitle>Editing {character.name}</PageTitle>

        <PageSection>
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
              <Label>Profile</Label>
              <TextArea
                height={180}
                placeholder="Introduce your character here! Who are they? What are they like? What have they done?"
                value={this.state.profile}
                onChange={this.changeHandler("profile")}
              />
            </fieldset>

            <fieldset>
              <Button type="submit">Save</Button>
            </fieldset>
          </form>
        </PageSection>
      </PageWrapper>
    )
  }
}
