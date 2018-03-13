import * as React from "react"

import { routePaths } from "../../../routePaths"
import { RouterNavLink } from "./elements"

export function LoggedOutLinks() {
  return (
    <React.Fragment key="logged-out-links">
      <RouterNavLink to={routePaths.login}>
        <span>
          <i className="fas fa-sign-in-alt" /> Log in
        </span>
      </RouterNavLink>
    </React.Fragment>
  )
}
