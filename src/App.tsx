import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { AppNav } from "./AppNav"
import { CharacterEditPage } from "./CharacterEditPage"
import { CharacterListPage } from "./CharacterListPage"
import { CharacterPage } from "./CharacterPage"
import { HomePage } from "./HomePage"
import { NotFound } from "./NotFound"
import { routePaths } from "./routePaths"

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AppNav />

          <section className="section">
            <main className="container">
              <Switch>
                <Route exact path={routePaths.home} component={HomePage} />
                <Route exact path={routePaths.characterList} component={CharacterListPage} />
                <Route exact path={routePaths.viewCharacter(":id")} component={CharacterPage} />
                <Route exact path={routePaths.editCharacter(":id")} component={CharacterEditPage} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </section>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
