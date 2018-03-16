import { History } from "history"
import { observer } from "mobx-react"
import * as React from "react"
import { Link, Route } from "react-router-dom"

import { ErrorPage } from "../../../app/components/ErrorPage"
import { Icon } from "../../../app/components/Icon"
import { authStore } from "../../../auth/stores/AuthStore"
import { createFetcher } from "../../../common/components/Fetcher"
import { routePaths } from "../../../routePaths"
import { dangerText, primaryText } from "../../../ui/colors"
import { Button, PageSection, PageTitle, PageWrapperPanel } from "../../../ui/elements"
import { deleteCharacter, getCharacterById } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

const CharacterFetcher = createFetcher<CharacterModel>()

@observer
export class CharacterPage extends React.Component<{ id: string }> {
  render() {
    return (
      <CharacterFetcher
        fetch={() => getCharacterById(this.props.id)}
        render={fs => {
          switch (fs.state) {
            case "success":
              return <SuccessResult character={fs.data} />

            case "error":
              return (
                <ErrorPage
                  message={`Could not find character by id ${this.props.id}.`}
                  error={fs.error}
                />
              )

            default:
              return null
          }
        }}
      />
    )
  }
}

function SuccessResult({ character }: { character: CharacterModel }) {
  const user = authStore.user
  return (
    <PageWrapperPanel>
      <PageTitle>{character.name}</PageTitle>
      <PageSection>{character.tagline}</PageSection>
      {user !== null && user.uid === character.owner && <Actions character={character} />}
    </PageWrapperPanel>
  )
}

function Actions({ character }: { character: CharacterModel }) {
  return (
    <React.Fragment>
      <hr />
      <PageSection>
        <Link to={routePaths.editCharacter(character.id)}>
          <Button flat intentColor={primaryText}>
            <Icon name="edit" /> Edit
          </Button>
        </Link>{" "}
        <Route
          render={({ history }) => (
            <Button flat intentColor={dangerText} onClick={() => handleDelete(character, history)}>
              <Icon name="trash" /> Delete
            </Button>
          )}
        />
      </PageSection>
    </React.Fragment>
  )
}

async function handleDelete(character: CharacterModel, history: History) {
  // make them type the name to prevent accidental deletion
  const result = window.prompt("Type your character's name if you really really wanna delete them.")

  // cancelled, do nothing
  if (result === null) {
    return
  }

  // incorrect name
  if (result !== character.name) {
    window.alert("Name was incorrect.")
    return
  }

  await deleteCharacter(character.id)
}

/*
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
 */
