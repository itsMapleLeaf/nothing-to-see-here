import * as React from "react"
import { css, cx } from "react-emotion"

import { dangerText, primaryText, successText, textColor, warningText } from "../colors"

function createAnchorStyles(intentColor = primaryText) {
  return css`
    cursor: pointer;
    transition: 0.2s;

    color: ${intentColor};

    &:hover {
      color: ${textColor};
    }
  `
}

export const anchorPrimary = createAnchorStyles()
export const anchorDanger = createAnchorStyles(dangerText)
export const anchorWarning = createAnchorStyles(warningText)
export const anchorSuccess = createAnchorStyles(successText)

export function Anchor(props: React.HTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={cx(props.className, anchorPrimary)} />
}
