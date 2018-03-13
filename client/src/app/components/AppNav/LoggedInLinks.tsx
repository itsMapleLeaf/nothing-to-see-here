import * as React from "react"

import { Dropdown } from "../../../common/components/Dropdown"
import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { DropdownContentWrapper, NavLink, RouterNavLink } from "./elements"
import { NavCharacterLinks } from "./NavCharacterLinks"

export function LoggedInLinks() {
  return (
    <React.Fragment key="logged-in-links">
      <Dropdown
        head={
          <NavLink style={{ height: "100%" }}>
            {/* NOTE: this span needs to be here to preserve the space between the icon and text */}
            <span>
              <i className="fas fa-users" /> Characters
            </span>
          </NavLink>
        }
        content={
          <DropdownContentWrapper>
            <RouterNavLink to={routePaths.characterList}>Your Characters</RouterNavLink>
            <hr />
            <NavCharacterLinks />
          </DropdownContentWrapper>
        }
      />

      <RouterNavLink to={routePaths.chat}>
        <span>
          <i className="fas fa-comments" /> Chat
        </span>
      </RouterNavLink>

      <StoreConsumer>
        {({ authStore }) => (
          <NavLink onClick={() => authStore.signOut()}>
            <span>
              <i className="fas fa-sign-out-alt" /> Log out
            </span>
          </NavLink>
        )}
      </StoreConsumer>
    </React.Fragment>
  )
}
