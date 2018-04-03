import styled, { css } from "react-emotion"

import { backgroundColor, shadowColor } from "./colors"

export const inputPadding = css`
  padding: 0.5rem 0.75rem;
`

export const inputStyle = css`
  ${inputPadding};
  background: ${backgroundColor};
  box-shadow: 0px 0px 8px ${shadowColor} inset;
`

export const Input = styled.input`
  ${inputStyle};
`
