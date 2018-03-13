import "sanitize.css"

import { configure } from "mobx"
import * as React from "react"
import * as ReactDOM from "react-dom"

import { App } from "./app/components/App"
import { initFirebase } from "./firebase"
import { StoreProvider } from "./storeContext"
import { RootStore } from "./stores"
import { applyGlobalStyles } from "./styles"

function render(rootStore: RootStore) {
  const AppComponent = require("./app/components/App").App as typeof App
  applyGlobalStyles()

  const root = (
    <StoreProvider value={rootStore}>
      <AppComponent />
    </StoreProvider>
  )

  ReactDOM.render(root, document.getElementById("root"))
}

function main() {
  configure({ enforceActions: true })

  const app = initFirebase()
  const rootStore = new RootStore(app)
  render(rootStore)

  if (module.hot) {
    module.hot.accept("./app/components/App", () => render(rootStore))
  }
}

main()
