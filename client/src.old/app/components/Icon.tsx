import * as React from "react"

type Props = {
  name: string
  size?: string
  spin?: boolean
}

export const Icon = (props: Props) => {
  const spinClass = props.spin ? "fa-spin" : ""
  const sizeClass = props.size ? "fa-" + props.size : ""
  return <i className={`fas fa-${props.name} ${spinClass} ${sizeClass}`} />
}
