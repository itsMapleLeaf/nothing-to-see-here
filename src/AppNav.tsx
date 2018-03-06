import React from "react"
import { Link } from "react-router-dom"

import { routePaths } from "./routePaths"

export class AppNav extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title">
              <Link to={routePaths.index}>awesome rp website</Link>
            </h1>
          </div>
        </div>

        <div className="navbar-start">
          <Link to={routePaths.index} className="navbar-item">
            Home
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link to={routePaths.characterList} className="navbar-link">
              Characters
            </Link>
            <div className="navbar-dropdown is-boxed">
              <Link to={routePaths.characterList} className="navbar-item">
                Your Characters
              </Link>
              <Link to={routePaths.index} className="navbar-item">
                Browse All Characters
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
