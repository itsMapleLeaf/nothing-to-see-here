import React from "react"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"
import { danger } from "../../../styles/colors"
import { PageSection, PageTitle } from "../../../styles/layout"
import { Link, RouterLink } from "../../../styles/link"

const Actions = styled(PageSection)`
  > * + * {
    margin-left: 1rem;
  }
`

export function CharacterPageDetails({ character }: { character: any }) {
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
