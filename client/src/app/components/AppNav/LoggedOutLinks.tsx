import * as React from "react"

import { StoreConsumer } from "../../../storeContext"
import { NavLink } from "./NavLink"

export function LoggedOutLinks() {
  return (
    <React.Fragment key="logged-out-links">
      <StoreConsumer>
        {stores => (
          <NavLink text="Log in" icon="sign-in-alt" onClick={stores.appViewStore.showLogin} />
        )}
      </StoreConsumer>
    </React.Fragment>
  )
}
