import { computed } from "mobx"
import { inject, observer } from "mobx-react"
import React from "react"
import { RouteComponentProps } from "react-router-dom"

import { AuthStore } from "../../../auth/stores/AuthStore"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { Link } from "../../../styles/link"
import { CharacterListStore } from "../../stores/CharacterListStore"
import { CharacterEditForm } from "./CharacterEditForm"

type Props = RouteComponentProps<{ id: string }> & {
  characterListStore?: CharacterListStore
  authStore?: AuthStore
}

@inject("characterListStore", "authStore")
@observer
export class CharacterEditPage extends React.Component<Props> {
  @computed
  get character() {
    return this.props.characterListStore!.getCharacter(this.props.match.params.id)
  }

  render() {
    return <PageWrapper>{this.renderPageContent()}</PageWrapper>
  }

  renderPageContent() {
    if (!this.props.authStore!.isSignedIn) {
      return (
        <>
          <PageTitle>You must be signed in to view this page.</PageTitle>
          <PageSection>
            <Link href="#" onClick={() => this.props.history.goBack()}>
              Go back
            </Link>
          </PageSection>
        </>
      )
    }

    if (this.character == null) {
      return (
        <>
          <PageTitle>Character not found</PageTitle>
          <PageSection>
            <Link href="#" onClick={() => this.props.history.goBack()}>
              Go back
            </Link>
          </PageSection>
        </>
      )
    }

    return (
      <>
        <PageTitle>Editing {this.character.name}</PageTitle>
        <PageSection>
          <CharacterEditForm character={this.character} />
        </PageSection>
      </>
    )
  }
}
