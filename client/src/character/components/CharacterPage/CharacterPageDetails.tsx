import * as React from "react"
import styled from "styled-components"

import { Icon } from "../../../app/components/Icon"
import { routePaths } from "../../../routePaths"
import { danger } from "../../../styles/colors"
import { StyledLink, StyledRouterLink } from "../../../styles/elements/link"
import { PageSection, PageTitle } from "../../../styles/elements/page"
import { CharacterModel } from "../../models/CharacterModel"

const Actions = styled(PageSection)`
  > * + * {
    margin-left: 1rem;
  }
`

export function CharacterPageDetails({ character }: { character: CharacterModel }) {
  return (
    <React.Fragment>
      <PageTitle>{character.name}</PageTitle>
      <PageSection>{character.tagline}</PageSection>
      <hr />
      <Actions>
        <StyledRouterLink to={routePaths.editCharacter(character.id)}>
          <Icon name="edit" /> Edit
        </StyledRouterLink>{" "}
        <StyledLink onClick={() => alert("not implemented!")} color={danger}>
          <Icon name="trash" /> Delete
        </StyledLink>
      </Actions>
    </React.Fragment>
  )
}
