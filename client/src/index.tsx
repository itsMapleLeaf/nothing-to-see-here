import "bulma/css/bulma.css"

import React from "react"
import ReactDOM from "react-dom"

import { App } from "./modules/app/components/App"

function render() {
  ReactDOM.render(<App />, document.getElementById("root"))
}

render()
if (module.hot) {
  module.hot.accept(render)
}
