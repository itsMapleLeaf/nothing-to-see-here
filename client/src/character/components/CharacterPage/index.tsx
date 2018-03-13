import * as React from "react"

import { LoadingCover } from "../../../app/components/LoadingCover"
import { createFetcher, FetchState } from "../../../common/components/Fetcher"
import { PageWrapperPanel } from "../../../styles/elements/page"
import { fetchCharacterDetailsById } from "../../actions"
import { CharacterModel } from "../../models/CharacterModel"
import { CharacterPageDetails } from "./CharacterPageDetails"
import { CharacterPageError } from "./CharacterPageError"

const CharacterDetailsFetcher = createFetcher<CharacterModel>()

export function CharacterPage(props: { id: string }) {
  return (
    <PageWrapperPanel>
      <CharacterDetailsFetcher
        key={props.id}
        fetch={() => fetchCharacterDetailsById(props.id)}
        render={state => (
          <React.Fragment>
            {renderFetchResult(state)}
            {state.state === "fetching-long" && (
              <LoadingCover message="Fetching character details..." />
            )}
          </React.Fragment>
        )}
      />
    </PageWrapperPanel>
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
