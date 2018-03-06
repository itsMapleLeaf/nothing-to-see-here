import React from "react"
import { Link } from "react-router-dom"

import { routePaths } from "../../../../routePaths"
import { CharacterListFetcher } from "../../../character/components/CharacterListFetcher"

export class AppNav extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title">
              <Link to={routePaths.home}>awesome rp website</Link>
            </h1>
          </div>
        </div>

        <div className="navbar-start">
          <Link to={routePaths.home} className="navbar-item">
            Home
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <Link to={routePaths.characterList} className="navbar-link">
              Characters
            </Link>
            <div className="navbar-dropdown is-boxed">
              <Link to={routePaths.home} className="navbar-item">
                Browse All Characters
              </Link>
              <Link to={routePaths.characterList} className="navbar-item">
                Your Characters
              </Link>
              <hr className="navbar-divider" />

              <CharacterListFetcher>
                {characters =>
                  characters.map(character => (
                    <Link
                      to={routePaths.viewCharacter(character.id)}
                      key={character.id}
                      className="navbar-item"
                    >
                      {character.name}
                    </Link>
                  ))
                }
              </CharacterListFetcher>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
