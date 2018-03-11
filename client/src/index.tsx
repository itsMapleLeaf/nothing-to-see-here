import "sanitize.css"

import { useStrict } from "mobx"
import { Provider as StoreProvider } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { initFirebase } from "./firebase"
import { stores } from "./stores"
import { applyGlobalStyles } from "./styles"

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

function main() {
  useStrict(true)
  initFirebase()
  stores.authStore.listenForAuthStateChanges()
  render()

  if (module.hot) {
    module.hot.accept("./app/components/App", render)
  }
}

main()
