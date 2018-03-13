import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import styled from "styled-components"

import { CharacterEditPage } from "../../../character/components/CharacterEditPage"
import { CharacterListPage } from "../../../character/components/CharacterListPage"
import { CharacterPage } from "../../../character/components/CharacterPage"
import { ChatPage } from "../../../chat/components/ChatPage"
import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { AppNav } from "../AppNav"
import { AuthRoute } from "../AuthRoute"
import { HomePage } from "../HomePage"
import { LoadingCover } from "../LoadingCover"
import { LoginPageContainer } from "../LoginPage"
import { NotFound } from "../NotFound"

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
            <Route exact path={routePaths.home} render={() => <HomePage />} />
            <Route exact path={routePaths.login} render={() => <LoginPageContainer />} />

            <AuthRoute exact path={routePaths.characterList} render={() => <CharacterListPage />} />
            <Route
              exact
              path={routePaths.viewCharacter(":id")}
              render={({ match }) => <CharacterPage id={match.params.id} />}
            />
            <AuthRoute
              exact
              path={routePaths.editCharacter(":id")}
              render={({ match }) => <CharacterEditPage id={match.params.id} />}
            />

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
