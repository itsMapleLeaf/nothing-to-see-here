import { observer } from "mobx-react"
import * as React from "react"
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { CharacterListPage } from "../../../character/components/CharacterListPage"
import { NewCharacterPage } from "../../../character/components/NewCharacterPage"
import { ViewCharacterPage } from "../../../character/components/ViewCharacterPage"
import { routePaths } from "../../../routePaths"
import { AppNav } from "../AppNav"
import { AuthRoute } from "../AuthRoute"
import { HomePage } from "../HomePage"
import { LoadingCover } from "../LoadingCover"
import { NotFoundPage } from "../NotFoundPage"

export const App = observer(() => (
  <BrowserRouter>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppNav />

      <Switch>
        <Route exact path={routePaths.home} component={HomePage} />
        <AuthRoute exact path={routePaths.characterList} component={CharacterListPage} />
        <AuthRoute exact path={routePaths.newCharacter} component={NewCharacterPage} />
        <Route exact path={routePaths.viewCharacter(":id")} render={renderViewCharacterPage} />
        <Route component={NotFoundPage} />
      </Switch>

      {authStore.authenticating && <LoadingCover message="Logging in..." />}
    </div>
  </BrowserRouter>
))

const renderViewCharacterPage = ({ match }: RouteComponentProps<{ id: string }>) => (
  <ViewCharacterPage key={match.params.id} id={match.params.id} />
)
