import { Link as ReactRouterLink } from "react-router-dom"
import styled, { css } from "styled-components"

import { primary, textColor } from "./colors"

type LinkProps = { color?: string }

const linkStyles = css`
  color: ${({ color }: LinkProps) => color || primary};
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
