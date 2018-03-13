import styled from "styled-components"

import { foregroundColor, shadowColor } from "../../../styles/colors"

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
  margin-right: 1rem;
  /* align-self: stretch; */
  display: flex;
  flex-wrap: wrap;
`

export const DropdownContentWrapper = styled.div`
  background: ${foregroundColor};
  box-shadow: 0px 0px 8px ${shadowColor};
`
