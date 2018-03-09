import React from "react"
import { Link } from "react-router-dom"
import { routePaths } from "src/routePaths"

export function NotFound() {
  return (
    <div>
      <h1 className="title">oops! unable to find this page</h1>
      <Link to={routePaths.home} className="subtitle">
        Return to Home
      </Link>
    </div>
  )
}
