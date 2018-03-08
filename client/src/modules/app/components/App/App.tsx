import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"

import { routePaths } from "../../../../routePaths"
import { CharacterEditPage } from "../../../character/routes/CharacterEditPage"
import { CharacterListPage } from "../../../character/routes/CharacterListPage"
import { CharacterPage } from "../../../character/routes/CharacterPage"
import { HomePage } from "../../routes/HomePage"
import { NotFound } from "../../routes/NotFound"
import { AppNav } from "./AppNav"

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AppNav />

          <Switch>
            <Route exact path={routePaths.home} component={HomePage} />
            <Route exact path={routePaths.characterList} component={CharacterListPage} />
            <Route exact path={routePaths.viewCharacter(":id")} component={CharacterPage} />
            <Route exact path={routePaths.editCharacter(":id")} component={CharacterEditPage} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
