import { observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-router-dom"

import { ErrorPage } from "../../../app/components/ErrorPage"
import { authStore } from "../../../auth/stores/AuthStore"
import { createFetcher, FetchState } from "../../../common/components/Fetcher"
import { routePaths } from "../../../routePaths"
import {
  anchorPrimary,
  FadedText,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../ui/elements"
import { getCharactersOwnedByUser } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

const CharacterListFetcher = createFetcher<CharacterModel[]>()

@observer
export class CharacterListPage extends React.Component {
  render() {
    const user = authStore.user
    if (!user) {
      return null
    }

    return (
      <CharacterListFetcher
        fetch={() => getCharactersOwnedByUser(user.uid)}
        render={handleFetchResult}
      />
    )
  }
}

function handleFetchResult(fs: FetchState<CharacterModel[]>) {
  switch (fs.state) {
    case "success":
      return <SuccessResult characters={fs.data} />
    case "error":
      return <ErrorPage message="Failed to fetch characters." error={fs.error} />
    default:
      return null
  }
}

function SuccessResult({ characters }: { characters: CharacterModel[] }) {
  return (
    <PageWrapperPanel>
      <PageTitle>your characters</PageTitle>

      {characters.length === 0 && (
        <PageSection>
          <FadedText>No characters found.</FadedText>{" "}
          <Link className={anchorPrimary} to={routePaths.newCharacter}>
            Create one?
          </Link>
        </PageSection>
      )}

      {characters.map(entry => (
        <PageSection key={entry.id}>
          <Link className={anchorPrimary} to={routePaths.viewCharacter(entry.id)}>
            <h2>{entry.name}</h2>
          </Link>
          <p>{entry.tagline}</p>
        </PageSection>
      ))}
    </PageWrapperPanel>
  )
}
