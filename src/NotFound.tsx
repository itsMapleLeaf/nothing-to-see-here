import React from "react"
import { Link } from "react-router-dom"

import { routePaths } from "./routePaths"

export function NotFound() {
  return (
    <div>
      <p>oops! unable to find this page</p>
      <Link to={routePaths.index}>Return to Home</Link>
    </div>
  )
}
