import * as React from "react"
import { Route } from "react-router"

import { StyledLink } from "../../../styles/elements/link"

export const BackLink = () => (
  <Route>
    {routeProps => (
      <StyledLink href="#" onClick={() => routeProps.history.goBack()}>
        Go back
      </StyledLink>
    )}
  </Route>
)
