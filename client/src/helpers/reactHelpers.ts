import * as React from "react"

export function preventDefault(func: (event: React.SyntheticEvent<{}>) => void) {
  return (event: React.SyntheticEvent<{}>) => {
    event.preventDefault()
    func(event)
  }
}

export function onlyOnSelf(func: (event: React.SyntheticEvent<{}>) => void) {
  return (event: React.SyntheticEvent<{}>) => {
    if (event.target === event.currentTarget) {
      func(event)
    }
  }
}
