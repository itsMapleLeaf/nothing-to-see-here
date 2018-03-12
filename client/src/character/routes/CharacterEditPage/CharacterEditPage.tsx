import { observer } from "mobx-react"
import React from "react"
import { RouteComponentProps } from "react-router-dom"

import { BackLink } from "../../../app/components/BackLink"
import { StoreConsumer } from "../../../storeContext"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { CharacterModel } from "../../models/CharacterModel"
import { CharacterEditForm } from "./CharacterEditForm"

type Props = {
  character?: CharacterModel
}

@observer
class CharacterEditPageComponent extends React.Component<Props> {
  render() {
    return <PageWrapper>{this.renderPageContent()}</PageWrapper>
  }

  renderPageContent() {
    if (this.props.character == null) {
      return (
        <>
          <PageTitle>Character not found</PageTitle>
          <PageSection>
            <BackLink />
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
      />
    )}
  </StoreConsumer>
)
