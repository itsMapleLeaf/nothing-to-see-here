import { darken, grayscale } from "polished"
import styled, { css } from "react-emotion"

import { foregroundColorShade, textColor } from "../colors"

type ButtonProps = {
  flat?: boolean
  intentColor?: string
}

export const baseButtonStyle = css`
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: 0.2s;
`

export const filledStyle = (intentColor = foregroundColorShade) => css`
  color: ${textColor};
  background: ${intentColor};

  &:hover {
    background: ${darken(0.05, intentColor)};
  }
`

export const flatStyle = (intentColor = grayscale(darken(0.3, textColor))) => css`
  background: transparent;
  color: ${intentColor};

  &:hover {
    color: ${textColor};
  }
`

const resolveButtonStyle = (props: ButtonProps) => {
  if (props.flat) {
    return flatStyle(props.intentColor)
  } else {
    return filledStyle(props.intentColor)
  }
}

export const Button = styled.button`
  ${baseButtonStyle};
  ${resolveButtonStyle};
`
