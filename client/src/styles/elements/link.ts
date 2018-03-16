import styled, { css } from "react-emotion"
import { Link as RouterLink } from "react-router-dom"

import { primary, textColor } from "../colors"

type LinkProps = { color?: string }

export const linkStyles = css`
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: ${textColor};
  }
`

export const StyledLink = styled.a`
  ${linkStyles};
  color: ${({ color }: LinkProps) => color || primary};
`

export const StyledRouterLink = styled(RouterLink)`
  ${linkStyles};
  color: ${({ color }: LinkProps) => color || primary};
`
