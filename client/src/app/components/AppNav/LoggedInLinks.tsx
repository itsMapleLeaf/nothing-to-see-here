import * as React from "react"

import { Dropdown } from "../../../common/components/Dropdown"
import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { DropdownContentWrapper } from "./elements"
import { NavCharacterLinks } from "./NavCharacterLinks"
import { NavLink } from "./NavLink"

export function LoggedInLinks() {
  return (
    <React.Fragment key="logged-in-links">
      <Dropdown
        head={<NavLink text="Characters" icon="users" />}
        content={
          <DropdownContentWrapper>
            <NavLink to={routePaths.characterList} text="Your Characters" />
            <hr />
            <NavCharacterLinks />
          </DropdownContentWrapper>
        }
      />

      <NavLink to={routePaths.chat} text="Chat" icon="comments" />

      <StoreConsumer>
        {({ authStore }) => (
          <NavLink onClick={() => authStore.signOut()} text="Log out" icon="sign-out-alt" />
        )}
      </StoreConsumer>
    </React.Fragment>
  )
}
