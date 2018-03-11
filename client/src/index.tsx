import "sanitize.css"

import { useStrict } from "mobx"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { initFirebase } from "./firebase"
import { StoreProvider } from "./storeContext"
import { createStores } from "./stores"
import { applyGlobalStyles } from "./styles"

function render(stores: any) {
  const AppComponent = require("./app/components/App").App as typeof App
  applyGlobalStyles()

  const root = (
    <StoreProvider value={stores}>
      <AppComponent />
    </StoreProvider>
  )

  ReactDOM.render(root, document.getElementById("root"))
}

function main() {
  useStrict(true)

  const app = initFirebase()
  const stores = createStores(app)
  render(stores)

  if (module.hot) {
    module.hot.accept("./app/components/App", () => render(stores))
  }
}

main()
