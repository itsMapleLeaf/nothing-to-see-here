import * as React from "react"

import { LoadingCover } from "../../../app/components/LoadingCover"
import { createFetcher, FetchState } from "../../../common/components/Fetcher"
import { PageWrapper } from "../../../styles/layout"
import { fetchCharacterDetailsById } from "../../actions"
import { CharacterModel } from "../../models/CharacterModel"
import { CharacterPageDetails } from "./CharacterPageDetails"
import { CharacterPageError } from "./CharacterPageError"

const CharacterDetailsFetcher = createFetcher<CharacterModel>()

export function CharacterPage(props: { id: string }) {
  return (
    <PageWrapper>
      <CharacterDetailsFetcher
        id={props.id}
        fetch={fetchCharacterDetailsById}
        render={state => (
          <React.Fragment>
            {renderFetchResult(state)}
            <LoadingCover
              message="Fetching character details..."
              visible={state.state === "fetching-long"}
            />
          </React.Fragment>
        )}
      />
    </PageWrapper>
  )

  function renderFetchResult(state: FetchState<CharacterModel>) {
    switch (state.state) {
      case "success":
        return <CharacterPageDetails character={state.data} />
      case "error":
        return <CharacterPageError error={state.error} />
      default:
        return ""
    }
  }
}
