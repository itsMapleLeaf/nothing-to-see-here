import { darken } from "polished"
import styled, { css } from "react-emotion"

import { backgroundColor, primaryText } from "./colors"
import { inputPadding } from "./input"

export const buttonStyle = css`
  ${inputPadding};
  background: ${backgroundColor};
  transition: 0.2s;

  &:hover {
    background: ${darken(0.025, backgroundColor)};
  }
`

export const buttonFlatStyle = css`
  ${inputPadding};
  transition: 0.2s;

  &:hover {
    color: ${primaryText};
  }
`

interface ButtonProps {
  flat?: boolean
}

function resolveFlatStyle(props: ButtonProps) {
  return props.flat ? buttonFlatStyle : buttonStyle
}

export const Button = styled.button`
  ${resolveFlatStyle};
`
