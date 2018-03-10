import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import styled from "styled-components"

import { CharacterEditPage } from "../../../character/routes/CharacterEditPage"
import { CharacterListPage } from "../../../character/routes/CharacterListPage"
import { CharacterPage } from "../../../character/routes/CharacterPage"
import { ChatPage } from "../../../chat/routes/ChatPage"
import { routePaths } from "../../../routePaths"
import { HomePage } from "../../routes/HomePage"
import { NotFound } from "../../routes/NotFound"
import { AppNav } from "./AppNav"

const AppWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <AppWrapper>
          <AppNav />
          <Switch>
            <Route exact path={routePaths.home} component={HomePage} />
            <Route exact path={routePaths.characterList} component={CharacterListPage} />
            <Route exact path={routePaths.viewCharacter(":id")} component={CharacterPage} />
            <Route exact path={routePaths.editCharacter(":id")} component={CharacterEditPage} />
            <Route exact path={routePaths.chat} component={ChatPage} />
            <Route component={NotFound} />
          </Switch>
        </AppWrapper>
      </BrowserRouter>
    )
  }
}
