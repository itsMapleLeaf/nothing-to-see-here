import React from "react"
import styled, { css } from "styled-components"

type Props = { visible: boolean; message: string }

const hiddenStyle = css`
  opacity: 0;
  visibility: hidden;
`

const Shade = styled.div`
  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  transition: 0.3s;

  ${({ visible }: { visible: boolean }) => (visible ? "" : hiddenStyle)};
`

const Message = styled.h2`
  font-style: italic;
  margin: 1rem;
`

export function LoadingCover(props: Props) {
  return (
    <Shade visible={props.visible}>
      <i className="fas fa-circle-notch fa-4x fa-spin" />
      <Message>{props.message}</Message>
    </Shade>
  )
}
