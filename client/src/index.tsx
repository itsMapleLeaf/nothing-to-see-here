import "sanitize.css"

import { Provider as StoreProvider } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { AuthStore } from "./auth/stores/AuthStore"
import { initFirebase } from "./firebase"
import { applyGlobalStyles } from "./styles"

initFirebase()

const stores = {
  authStore: new AuthStore(),
}

function render() {
  applyGlobalStyles()

  const root = (
    <StoreProvider {...stores}>
      <App />
    </StoreProvider>
  )

  ReactDOM.render(root, document.getElementById("root"))
}

render()
if (module.hot) {
  module.hot.accept(render)
}
