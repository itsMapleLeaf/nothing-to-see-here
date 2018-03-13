import { observer } from "mobx-react"
import * as React from "react"

import { BackLink } from "../../../app/components/BackLink"
import { StoreConsumer } from "../../../storeContext"
import { PageSection, PageTitle, PageWrapperPanel } from "../../../styles/elements/page"
import { CharacterModel } from "../../models/CharacterModel"
import { CharacterEditForm } from "./CharacterEditForm"

type Props = {
  character?: CharacterModel
}

@observer
class CharacterEditPageComponent extends React.Component<Props> {
  render() {
    return <PageWrapperPanel>{this.renderPageContent()}</PageWrapperPanel>
  }

  renderPageContent() {
    if (!this.props.character) {
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

export const CharacterEditPage = (props: { id: string }) => (
  <StoreConsumer>
    {stores => (
      <CharacterEditPageComponent character={stores.characterListStore.getCharacter(props.id)} />
    )}
  </StoreConsumer>
)
