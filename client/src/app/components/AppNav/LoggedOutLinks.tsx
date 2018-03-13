import * as React from "react"

import { routePaths } from "../../../routePaths"
import { NavLink } from "./NavLink"

export function LoggedOutLinks() {
  return (
    <React.Fragment key="logged-out-links">
      <NavLink to={routePaths.login} text="Log in" icon="sign-in-alt" />
    </React.Fragment>
  )
}
