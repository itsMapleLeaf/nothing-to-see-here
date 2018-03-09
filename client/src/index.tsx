import "sanitize.css"

import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { applyGlobalStyles } from "./styles"

function render() {
  applyGlobalStyles()
  ReactDOM.render(<App />, document.getElementById("root"))
}

render()
if (module.hot) {
  module.hot.accept(render)
}
