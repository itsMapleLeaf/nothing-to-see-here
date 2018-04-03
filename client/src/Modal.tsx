import * as React from "react"
import styled from "react-emotion"

import { onlyOnSelf } from "./helpers/reactHelpers"
import { foregroundColor, shadowColor } from "./style/colors"

const Shade = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Panel = styled.div`
  background-color: ${foregroundColor};
  box-shadow: 0px 4px 8px ${shadowColor};

  width: max-content;
  max-width: calc(100vw - 4rem);

  height: max-content;
  max-height: calc(100vh - 4rem);

  overflow-y: auto;
`

interface ModalProps {
  children: React.ReactNode
  onShadeClick?: () => void
}

export function Modal(props: ModalProps) {
  return (
    <Shade onClick={onlyOnSelf(() => props.onShadeClick && props.onShadeClick())}>
      <Panel>{props.children}</Panel>
    </Shade>
  )
}
