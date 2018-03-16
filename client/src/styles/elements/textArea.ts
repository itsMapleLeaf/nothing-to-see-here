import styled from "react-emotion"

import { inputBaseStyles } from "./inputBaseStyles"

export const TextArea = styled.textarea`
  ${inputBaseStyles}

  height: ${({ height }: { height?: number }) => height || 100}px;
  font: inherit;
`
