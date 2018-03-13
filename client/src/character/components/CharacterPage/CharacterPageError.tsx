import * as React from "react"

import { PageSection, PageTitle } from "../../../styles/elements/page"

export function CharacterPageError(props: { error: any }) {
  return (
    <React.Fragment>
      <PageTitle>Character not found :(</PageTitle>
      <PageSection>Error: {props.error.message || String(props.error)}</PageSection>
    </React.Fragment>
  )
}