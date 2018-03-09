import React from "react"
import { Link } from "react-router-dom"
import { Character } from "src/api"
import { routePaths } from "src/routePaths"
import { activeColor, textColor } from "src/styles/colors"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
`

const Avatar = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);
`

const Info = styled.div`
  padding: 0.8rem;
`

const Name = styled.h2`
  color: ${activeColor};
  transition: 0.2s;

  &:hover {
    color: ${textColor};
  }
`

const Description = styled.div``

export function CharacterListItem(props: { character: Character }) {
  return (
    <Wrapper>
      <Avatar />
      <Info>
        <Link to={routePaths.viewCharacter(props.character.id)}>
          <Name>{props.character.name}</Name>
        </Link>
        <Description>{props.character.profile}</Description>
      </Info>
    </Wrapper>
  )
}
