import "sanitize.css"

import { Provider as StoreProvider } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { AuthStore } from "./auth/stores/AuthStore"
import { initFirebase } from "./firebase"
import { applyGlobalStyles } from "./styles"

const stores = {
  authStore: new AuthStore(),
}

function render() {
  const AppComponent = require("./app/components/App").App as typeof App
  applyGlobalStyles()

  const root = (
    <StoreProvider {...stores}>
      <AppComponent />
    </StoreProvider>
  )

  ReactDOM.render(root, document.getElementById("root"))
}

initFirebase()
stores.authStore.listenForAuthStateChanges()
render()
if (module.hot) {
  module.hot.accept("./app/components/App", render)
}
