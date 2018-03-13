import * as React from "react"
import styled from "styled-components"

import { Shade } from "../../../styles/elements/shade"

type Props = {
  message: string
}

const Message = styled.h2`
  font-style: italic;
  margin: 1rem;
`

export function LoadingCover(props: Props) {
  return (
    <Shade>
      <i className="fas fa-circle-notch fa-4x fa-spin" />
      <Message>{props.message}</Message>
    </Shade>
  )
}
