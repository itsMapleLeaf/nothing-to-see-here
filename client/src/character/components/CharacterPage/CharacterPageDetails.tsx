import * as React from "react"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"
import { danger } from "../../../styles/colors"
import { PageSection, PageTitle } from "../../../styles/elements/page"
import { Link, RouterLink } from "../../../styles/elements/link"
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
