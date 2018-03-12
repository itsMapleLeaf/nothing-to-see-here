import React from "react"
import { RouteComponentProps } from "react-router"

import { createFetcher } from "../../../common/components/Fetcher"
import { PageWrapper } from "../../../styles/layout"
import { fetchCharacterDetailsById } from "../../actions"
import { CharacterPageDetails } from "./CharacterPageDetails"
import { CharacterPageError } from "./CharacterPageError"

const CharacterDetailsFetcher = createFetcher<any>()

export function CharacterPage(props: RouteComponentProps<{ id: string }>) {
  return (
    <PageWrapper>
      <CharacterDetailsFetcher
        id={props.match.params.id}
        fetch={fetchCharacterDetailsById}
        render={state => {
          switch (state.state) {
            case "success":
              return <CharacterPageDetails character={state.data} />
            case "error":
              return <CharacterPageError error={state.error} />
            default:
              return ""
          }
        }}
      />
    </PageWrapper>
  )
}
