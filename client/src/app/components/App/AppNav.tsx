import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"
import { foregroundColor, foregroundColorHighlight, shadowColor } from "../../../styles/colors"

const Nav = styled.nav`
  background-color: ${foregroundColor};
  box-shadow: 0px 0px 8px ${shadowColor};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  flex-shrink: 0;
`

const NavBrand = styled.section`
  h1 {
    margin: 0;
    padding: 0.5rem 1rem;
  }
`

const NavLinks = styled.section`
  padding-right: 1rem;
  align-self: stretch;
  display: flex;
  min-height: 3rem;
`

const NavLink = styled(Link)`
  padding: 0rem 1rem;
  display: block;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${foregroundColorHighlight};
  }
`

export class AppNav extends React.Component {
  render() {
    return (
      <Nav>
        <NavBrand>
          <Link to={routePaths.home}>
            <h1>RP website</h1>
          </Link>
        </NavBrand>
        <NavLinks>
          <NavLink to={routePaths.home}>Home</NavLink>
          <NavLink to={routePaths.characterList}>Characters</NavLink>
          <NavLink to={routePaths.chat}>Chat</NavLink>
        </NavLinks>
      </Nav>
    )
  }
}
