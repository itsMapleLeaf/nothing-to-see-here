import React from "react"
import { Link } from "react-router-dom"
import { Character } from "src/api"
import { routePaths } from "src/routePaths"

export function CharacterListItem(props: { character: Character }) {
  return (
    <div>
      <h2>
        <Link to={routePaths.viewCharacter(props.character.id)}>{props.character.name}</Link>
      </h2>
    </div>
  )
}
