import React from "react"
import { Route } from "react-router"

import { Link } from "../../../styles/link"

export const BackLink = () => (
  <Route>
    {routeProps => (
      <Link href="#" onClick={() => routeProps.history.goBack()}>
        Go back
      </Link>
    )}
  </Route>
)
