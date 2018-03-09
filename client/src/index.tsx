import "@blueprintjs/core/lib/css/blueprint.css"
import "normalize.css/normalize.css"

import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"

function render() {
  ReactDOM.render(<App />, document.getElementById("root"))
}

render()
if (module.hot) {
  module.hot.accept(render)
}
