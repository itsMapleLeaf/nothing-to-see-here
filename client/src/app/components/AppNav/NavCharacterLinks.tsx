import * as React from "react"

import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { RouterNavLink } from "./elements"

export function NavCharacterLinks() {
  return (
    <StoreConsumer>
      {({ characterListStore }) =>
        characterListStore.characters.map(character => (
          <RouterNavLink to={routePaths.viewCharacter(character.id)} key={character.id}>
            {character.name}
          </RouterNavLink>
        ))
      }
    </StoreConsumer>
  )
}
