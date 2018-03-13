import { darken } from "polished"
import styled, { css } from "styled-components"

import { foregroundColorShade } from "../colors"

const flatStyle = css`
  background: transparent;
  opacity: 0.7;

  &:hover {
    background: transparent;
    opacity: 1;
  }
`

export const Button = styled.button`
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;

  background: ${darken(0.03, foregroundColorShade)};

  &:hover {
    background: ${darken(0.05, foregroundColorShade)};
  }

  ${(props: { flat?: boolean }) => (props.flat ? flatStyle : "")};
`
