import * as React from "react"
import styled from "react-emotion"

import { foregroundColor, primaryText, shadowColor } from "./style/colors"

const Header = styled.header`
  background: ${foregroundColor};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  box-shadow: 0px 0px 8px ${shadowColor};
`

const Title = styled.h1`
  padding: 0.5rem 1rem;
`

const Nav = styled.nav`
  padding: 0 0.5rem;
  display: flex;
`

const NavLink = styled.a`
  display: block;
  padding: 0.5rem;

  transition: 0.2s;

  &:hover {
    color: ${primaryText};
  }
`

export function AppHeader() {
  return (
    <Header>
      <Title>awesome website</Title>
      <Nav>
        <NavLink href="#">some</NavLink>
        <NavLink href="#">header</NavLink>
        <NavLink href="#">links</NavLink>
      </Nav>
    </Header>
  )
}
