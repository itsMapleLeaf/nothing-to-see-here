import "sanitize.css"

import { configure } from "mobx"
import * as React from "react"
import * as ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { applyGlobalStyles } from "./ui/globalStyles"

function render() {
  ReactDOM.render(<App />, document.getElementById("root"))
}

function main() {
  configure({ enforceActions: true })
  applyGlobalStyles()
  render()

  if (module.hot) {
    module.hot.accept("./app/components/App", render)
  }
}

main()
