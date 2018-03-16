import * as React from "react"
import styled from "react-emotion"

import { Shade } from "../../../styles/elements/shade"
import { Icon } from "../Icon"

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
      <Icon name="circle-notch" size="4x" spin />
      <Message>{props.message}</Message>
    </Shade>
  )
}
