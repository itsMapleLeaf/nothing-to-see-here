import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { foregroundColor, foregroundColorHighlight, shadowColor } from "../../../styles/colors"

export const Nav = styled.nav`
  background-color: ${foregroundColor};
  box-shadow: 0px 0px 8px ${shadowColor};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  flex-shrink: 0;
`

export const NavBrand = styled.section`
  h1 {
    margin: 0;
    padding: 0.5rem 1rem;
  }
`

export const NavLinks = styled.section`
  padding-right: 1rem;
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
`

const navLinkStyles = css`
  padding: 0.5rem 0.8rem;

  display: flex;
  align-items: center;

  background-color: ${foregroundColor};

  user-select: none;

  &:hover {
    background-color: ${foregroundColorHighlight};
  }

  span {
    word-break: keep-all;
  }
`

export const NavLink = styled.a`
  ${navLinkStyles};
  cursor: pointer;
`

export const RouterNavLink = styled(Link)`
  ${navLinkStyles};
`

export const DropdownContentWrapper = styled.div`
  background: ${foregroundColor};
  box-shadow: 0px 0px 8px ${shadowColor};
`
