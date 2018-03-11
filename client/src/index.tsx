import "sanitize.css"

import { useStrict } from "mobx"
import { Provider as StoreProvider } from "mobx-react"
import React from "react"
import ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { initFirebase } from "./firebase"
import { applyGlobalStyles } from "./styles"
import { createStores } from "./stores"

function render(stores: any) {
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
  const stores = createStores()
  render(stores)

  if (module.hot) {
    module.hot.accept("./app/components/App", () => render(stores))
  }
}

main()
