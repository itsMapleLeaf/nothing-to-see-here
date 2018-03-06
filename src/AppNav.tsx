import React from "react"
import { Link } from "react-router-dom"

import { Character, getCharacterList } from "./api"
import { routePaths } from "./routePaths"

export class AppNav extends React.Component {
  state = {
    characters: [] as Character[],
  }

  async componentDidMount() {
    this.setState({
      characters: await getCharacterList(),
    })
  }

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
              <hr className="navbar-divider" />
              {this.state.characters.map(character => (
                <Link
                  to={routePaths.viewCharacter(character.id)}
                  key={character.id}
                  className="navbar-item"
                >
                  {character.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
