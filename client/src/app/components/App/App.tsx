import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import styled from "styled-components"

import { CharacterEditPage } from "../../../character/routes/CharacterEditPage"
import { CharacterListPage } from "../../../character/routes/CharacterListPage"
import { CharacterPage } from "../../../character/routes/CharacterPage"
import { ChatPage } from "../../../chat/routes/ChatPage"
import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { HomePage } from "../../routes/HomePage"
import { LoginPageContainer } from "../../routes/LoginPage"
import { NotFound } from "../../routes/NotFound"
import { AuthRoute } from "../AuthRoute"
import { LoadingCover } from "../LoadingCover"
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

          {/* prettier-ignore */}
          <Switch>
            <Route exact path={routePaths.home} render={() => <HomePage />} />
            <Route exact path={routePaths.login} render={() => <LoginPageContainer />} />
            <AuthRoute exact path={routePaths.characterList} render={() => <CharacterListPage />} />
            <Route exact path={routePaths.viewCharacter(":id")} render={props => <CharacterPage {...props} />} />
            <AuthRoute exact path={routePaths.editCharacter(":id")} render={props => <CharacterEditPage {...props} />} />
            <AuthRoute exact path={routePaths.chat} render={() => <ChatPage />} />
            <Route render={() => <NotFound />} />
          </Switch>

          <StoreConsumer>
            {stores => (
              <LoadingCover visible={!stores.authStore.authCheckFinished} message="Logging in..." />
            )}
          </StoreConsumer>
        </AppWrapper>
      </BrowserRouter>
    )
  }
}
