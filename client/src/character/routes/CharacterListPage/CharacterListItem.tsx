import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"
import { primary, textColor } from "../../../styles/colors"

const Wrapper = styled.div`
  display: flex;
`

const Avatar = styled.div`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.5);

  @media (max-width: 450px) {
    display: none;
  }

  margin-right: 0.8rem;
`

const Info = styled.div``

const Name = styled.h2`
  color: ${primary};
  transition: 0.2s;

  &:hover {
    color: ${textColor};
  }
`

const Description = styled.div``

export function CharacterListItem(props: { character: any }) {
  return (
    <Wrapper>
      <Avatar />
      <Info>
        <Link to={routePaths.viewCharacter(props.character.id)}>
          <Name>{props.character.name}</Name>
        </Link>
        <Description>{props.character.tagline}</Description>
      </Info>
    </Wrapper>
  )
}
