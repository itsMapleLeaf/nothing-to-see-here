import React from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"

import { CharacterEditPage } from "./CharacterEditPage"
import { CharacterListPage } from "./CharacterListPage"
import { CharacterPage } from "./CharacterPage"
import { NotFound } from "./NotFound"
import { routePaths } from "./routePaths"

const redirect = (path: string) => () => <Redirect to={path} />

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section className="section">
          <main className="container">
            <Switch>
              <Route exact path={routePaths.index} render={redirect(routePaths.characterList)} />
              <Route exact path={routePaths.characterList} component={CharacterListPage} />
              <Route exact path={routePaths.viewCharacter(":id")} component={CharacterPage} />
              <Route exact path={routePaths.editCharacter(":id")} component={CharacterEditPage} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </section>
      </BrowserRouter>
    )
  }
}
