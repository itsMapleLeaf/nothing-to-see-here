import { Link as RouterLink } from "react-router-dom"
import styled, { css } from "styled-components"

import { primary, textColor } from "../colors"

type LinkProps = { color?: string }

const linkStyles = css`
  color: ${({ color }: LinkProps) => color || primary};
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: ${textColor};
  }
`

export const StyledLink = styled.a`
  ${linkStyles};
`

export const StyledRouterLink = styled(RouterLink)`
  ${linkStyles};
`
