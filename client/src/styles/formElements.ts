import { darken } from "polished"
import styled, { css } from "styled-components"

import { foregroundColorShade, shadowColor } from "./colors"

const inputBaseStyles = css`
  display: block;
  width: 100%;
  background-color: ${foregroundColorShade};
  border: none;
  padding: 0.5rem 0.75rem;
  box-shadow: 0px 0px 8px ${shadowColor} inset;
`

export const Label = styled.label`
  display: block;
  padding-bottom: 0.3rem;
`

export const Input = styled.input`
  ${inputBaseStyles};
`

export const TextArea = styled.textarea`
  ${inputBaseStyles}

  height: ${({ height }: { height?: number }) => height || 100}px;
  font: inherit;
`

export const Button = styled.button`
  border: none;
  background: ${darken(0.03, foregroundColorShade)};
  padding: 0.5rem 0.75rem;

  &:hover {
    background: ${darken(0.05, foregroundColorShade)};
  }
`
