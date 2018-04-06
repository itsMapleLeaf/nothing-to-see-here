import "sanitize.css"

import { configure } from "mobx"
import * as React from "react"
import * as ReactDOM from "react-dom"

import { App } from "./App"
import { applyGlobalStyles } from "./style/globalStyles"
import { userStore } from "./UserStore"

function render() {
  applyGlobalStyles()
  ReactDOM.render(<App />, document.getElementById("root"))
}

function main() {
  userStore.restoreSession().catch(console.error)
  configure({ enforceActions: true })
  render()

  if (module.hot) {
    module.hot.accept(["./App", "./style/globalStyles"], render)
  }
}

main()
