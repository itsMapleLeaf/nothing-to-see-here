import React from "react"
import { Link } from "react-router-dom"
import { backgroundColor2, backgroundColor3, shadowColor } from "src/styles/colors"
import styled from "styled-components"

import { routePaths } from "../../../routePaths"

const Nav = styled.nav`
  background-color: ${backgroundColor2};
  box-shadow: 0px 0px 8px ${shadowColor};

  display: flex;
  align-items: center;

  margin-bottom: 1rem;
`

const NavBrand = styled.section`
  h1 {
    margin: 0;
    padding: 0.5rem 1rem;
  }
`

const NavLinks = styled.section`
  margin-left: auto;
  padding-right: 1rem;
  align-self: stretch;
  display: flex;
`

const NavLink = styled(Link)`
  padding: 0rem 1rem;
  display: block;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${backgroundColor3};
  }
`

export class AppNav extends React.Component {
  render() {
    return (
      <Nav>
        <NavBrand>
          <Link to={routePaths.home}>
            <h1>awesome RP website</h1>
          </Link>
        </NavBrand>
        <NavLinks>
          <NavLink to={routePaths.home}>Home</NavLink>
          <NavLink to={routePaths.characterList}>Characters</NavLink>
        </NavLinks>
      </Nav>
    )
  }
}
