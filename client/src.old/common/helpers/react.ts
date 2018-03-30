import * as React from "react"

export function preventDefault(func: (event: React.SyntheticEvent<{}>) => void) {
  return (event: React.SyntheticEvent<{}>) => {
    event.preventDefault()
    func(event)
  }
}
