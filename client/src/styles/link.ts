import { Link as ReactRouterLink } from "react-router-dom"
import styled, { css } from "styled-components"

import { primary, textColor } from "./colors"

const linkStyles = css`
  color: ${primary};
  transition: 0.2s;

  &:hover {
    color: ${textColor};
  }
`

export const Link = styled.a`
  ${linkStyles};
`

export const RouterLink = styled(ReactRouterLink)`
  ${linkStyles};
`
