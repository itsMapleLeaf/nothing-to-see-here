import styled from "styled-components"

export const FadedText = styled.span`
  opacity: 0.5;

  /* HACK: for some reason, spans don't give opacity to child elements */
  > * {
    opacity: 0.5;
  }
`
