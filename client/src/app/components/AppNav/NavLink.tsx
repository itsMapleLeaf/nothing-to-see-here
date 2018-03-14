import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { foregroundColor, foregroundColorHighlight, primary } from "../../../styles/colors"
import { Icon } from "../Icon"

type Props = {
  text: string
  icon?: string
  to?: string
  onClick?: () => void
}

export function NavLink(props: Props) {
  return (
    <NavLinkWrapper to={props.to || "#"} onClick={props.onClick}>
      {/* NOTE: span is needed to preserve the space between the icon and text */}
      <span>
        {props.icon && <Icon name={props.icon} />} {props.text}
      </span>
    </NavLinkWrapper>
  )
}

const NavLinkWrapper = styled(Link)`
  transition: 0.2s;

  padding: 0.5rem 0.8rem;

  display: flex;
  align-items: center;

  background-color: ${foregroundColor};

  user-select: none;

  &:hover {
    /* background-color: ${foregroundColorHighlight}; */
    color: ${primary};
  }

  span {
    word-break: keep-all;
  }
`
