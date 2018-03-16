import { action, computed, observable } from "mobx"
import { observer } from "mobx-react"
import * as React from "react"
import { Link, Redirect } from "react-router-dom"

import { Icon } from "../../../app/components/Icon"
import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import { dangerText, primaryText } from "../../../ui/colors"
import { Button, PageSection, PageTitle, PageWrapperPanel } from "../../../ui/elements"
import { deleteCharacter, getCharacterById } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

@observer
export class CharacterPage extends React.Component<{ id: string }> {
  @observable character: CharacterModel | null = null
  @observable shouldRedirect = false

  @action
  setCharacter = (character: CharacterModel) => {
    this.character = character
  }

  @action
  triggerRedirect = () => {
    this.shouldRedirect = true
  }

  @computed
  get isOwned() {
    return (
      this.character !== null &&
      authStore.user !== null &&
      this.character.owner === authStore.user.uid
    )
  }

  handleDeleteAction = async () => {
    if (!this.character) return

    if (!this.isOwned) {
      alert("You do not own this character.")
      return
    }

    const result = window.prompt(
      "Type your character's name if you really really wanna delete them.",
    )

    if (result !== null) {
      if (result === this.character.name) {
        await deleteCharacter(this.character.id)
        this.triggerRedirect()
      } else {
        window.alert("Name was incorrect.")
      }
    }
  }

  async componentDidMount() {
    this.setCharacter(await getCharacterById(this.props.id))
  }

  render() {
    if (this.shouldRedirect) {
      return <Redirect to={routePaths.characterList} />
    }

    if (!this.character) {
      return null
    }

    return (
      <PageWrapperPanel>
        <PageTitle>{this.character.name}</PageTitle>
        <PageSection>{this.character.tagline}</PageSection>
        {this.isOwned && (
          <React.Fragment>
            <hr />
            <PageSection>
              <Link to={routePaths.editCharacter(this.character.id)}>
                <Button flat intentColor={primaryText}>
                  <Icon name="edit" /> Edit
                </Button>
              </Link>{" "}
              <Button flat intentColor={dangerText} onClick={this.handleDeleteAction}>
                <Icon name="trash" /> Delete
              </Button>
            </PageSection>
          </React.Fragment>
        )}
      </PageWrapperPanel>
    )
  }
}
