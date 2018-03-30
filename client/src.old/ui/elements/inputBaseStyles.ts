import { css } from "react-emotion"

import { foregroundColorShade, shadowColor } from "../colors"

export const inputBaseStyles = css`
  display: block;
  width: 100%;
  background-color: ${foregroundColorShade};
  border: none;
  padding: 0.5rem 0.75rem;
  box-shadow: 0px 0px 8px ${shadowColor} inset;
`
