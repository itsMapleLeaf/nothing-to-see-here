import * as React from "react"
import { Link } from "react-router-dom"

import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { Nav, NavBrand, NavLinks } from "./elements"
import { LoggedInLinks } from "./LoggedInLinks"
import { LoggedOutLinks } from "./LoggedOutLinks"

export function AppNav() {
  return (
    <Nav>
      <NavBrand>
        <Link to={routePaths.home}>
          <h1>RP website</h1>
        </Link>
      </NavBrand>

      <StoreConsumer>
        {({ authStore }) => (
          <NavLinks>{authStore.isSignedIn ? <LoggedInLinks /> : <LoggedOutLinks />}</NavLinks>
        )}
      </StoreConsumer>
    </Nav>
  )
}
