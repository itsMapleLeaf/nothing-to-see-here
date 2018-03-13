import * as React from "react"

import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { NavLink } from "./NavLink"

export function NavCharacterLinks() {
  return (
    <StoreConsumer>
      {({ characterListStore }) =>
        characterListStore.characters.map(character => (
          <NavLink
            to={routePaths.viewCharacter(character.id)}
            key={character.id}
            text={character.name}
          />
        ))
      }
    </StoreConsumer>
  )
}
