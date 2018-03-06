import React from "react"
import { Link } from "react-router-dom"

import { Character } from "./api"
import { routePaths } from "./routePaths"

export function CharacterListItem(props: { character: Character }) {
  return (
    <div className="box">
      <h2 className="title is-3">
        <Link to={routePaths.viewCharacter(props.character.id)}>{props.character.name}</Link>
      </h2>
    </div>
  )
}
