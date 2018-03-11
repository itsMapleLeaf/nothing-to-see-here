import React from "react"
import { RouteComponentProps } from "react-router"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { danger } from "../../../styles/colors"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"
import { Link, RouterLink } from "../../../styles/link"

const Actions = styled(PageSection)`
  > * + * {
    margin-left: 1rem;
  }
`

type Props = RouteComponentProps<{ id: string }>
export class CharacterPage extends React.Component<Props> {
  render() {
    return (
      <PageWrapper>
        <StoreConsumer>
          {stores =>
            this.renderPageContent(
              stores.characterListStore.getCharacter(this.props.match.params.id),
            )
          }
        </StoreConsumer>
      </PageWrapper>
    )
  }

  renderPageContent(character: any) {
    if (!character) {
      return <PageTitle>Character not found :(</PageTitle>
    }

    return (
      <React.Fragment>
        <PageTitle>{character.name}</PageTitle>
        <PageSection>{character.tagline}</PageSection>
        <hr />
        <Actions>
          <RouterLink to={routePaths.editCharacter(character.id)}>
            <i className="fas fa-edit" /> Edit
          </RouterLink>{" "}
          <Link onClick={() => alert("not implemented!")} color={danger}>
            <i className="fas fa-trash" /> Delete
          </Link>
        </Actions>
      </React.Fragment>
    )
  }
}
