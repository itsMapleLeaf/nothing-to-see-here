import { History } from "history"
import { observer } from "mobx-react"
import React from "react"
import { RouteComponentProps } from "react-router-dom"

import { StoreConsumer } from "../../../storeContext"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { Link } from "../../../styles/link"
import { CharacterEditForm } from "./CharacterEditForm"

type Props = {
  character: any
  signedIn: boolean
  history: History
}

@observer
class CharacterEditPageComponent extends React.Component<Props> {
  render() {
    return <PageWrapper>{this.renderPageContent()}</PageWrapper>
  }

  renderPageContent() {
    // TODO: remove this logic when auth guarded routes are implemented
    if (!this.props.signedIn) {
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

    if (this.props.character == null) {
      return (
        <>
          <PageTitle>Character not found</PageTitle>
          <PageSection>
            {/* TODO: make this into its own component */}
            <Link href="#" onClick={() => this.props.history.goBack()}>
              Go back
            </Link>
          </PageSection>
        </>
      )
    }

    return (
      <>
        <PageTitle>Editing {this.props.character.name}</PageTitle>
        <PageSection>
          <CharacterEditForm character={this.props.character} />
        </PageSection>
      </>
    )
  }
}

export const CharacterEditPage = (props: RouteComponentProps<{ id: string }>) => (
  <StoreConsumer>
    {stores => (
      <CharacterEditPageComponent
        character={stores.characterListStore.getCharacter(props.match.params.id)}
        signedIn={stores.authStore.isSignedIn}
        history={props.history}
      />
    )}
  </StoreConsumer>
)
