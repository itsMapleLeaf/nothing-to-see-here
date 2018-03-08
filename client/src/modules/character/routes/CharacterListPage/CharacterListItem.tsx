import { Card } from "@blueprintjs/core"
import React from "react"
import { Link } from "react-router-dom"

import { Character } from "../../../../api"
import { routePaths } from "../../../../routePaths"

export function CharacterListItem(props: { character: Character }) {
  return (
    <Card>
      <h2>
        <Link to={routePaths.viewCharacter(props.character.id)}>{props.character.name}</Link>
      </h2>
    </Card>
  )
}
