import { observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-router-dom"

import { ErrorPage } from "../../../app/components/ErrorPage"
import { createFetcher, FetchState } from "../../../common/components/Fetcher"
import { routePaths } from "../../../routePaths"
import {
  anchorPrimary,
  FadedText,
  PageSection,
  PageTitle,
  PageWrapperPanel,
} from "../../../ui/elements"
import { getAllCharacters } from "../../firebaseActions"
import { CharacterModel } from "../../models/CharacterModel"

const CharacterListFetcher = createFetcher<CharacterModel[]>()

@observer
export class CharacterBrowsePage extends React.Component {
  render() {
    return <CharacterListFetcher fetch={() => getAllCharacters(10)} render={handleFetchResult} />
  }
}

function handleFetchResult(fs: FetchState<CharacterModel[]>) {
  switch (fs.state) {
    case "success": {
      const characters = fs.data
      return (
        <PageWrapperPanel>
          <PageTitle>all characters</PageTitle>

          {characters.length === 0 ? (
            <PageSection>
              <FadedText>No results found.</FadedText>
            </PageSection>
          ) : (
            characters.map(character => (
              <PageSection key={character.id}>
                <Link className={anchorPrimary} to={routePaths.viewCharacter(character.id)}>
                  <h2>{character.name}</h2>
                </Link>
                <p>{character.tagline}</p>
              </PageSection>
            ))
          )}
        </PageWrapperPanel>
      )
    }

    case "error":
      return <ErrorPage message="Failed to fetch characters." error={fs.error} />

    default:
      return null
  }
}
