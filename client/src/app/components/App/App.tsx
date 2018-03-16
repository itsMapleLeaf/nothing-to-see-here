import { observer } from "mobx-react"
import * as React from "react"
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom"

import { AuthRoute } from "../../../auth/components/AuthRoute"
import { authStore } from "../../../auth/stores/AuthStore"
import { CharacterCreatePage } from "../../../character/components/CharacterCreatePage"
import { CharacterListPage } from "../../../character/components/CharacterListPage"
import { CharacterPage } from "../../../character/components/CharacterPage"
import { routePaths } from "../../../routePaths"
import { AppNav } from "../AppNav"
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
        <AuthRoute exact path={routePaths.newCharacter} component={CharacterCreatePage} />
        <Route exact path={routePaths.viewCharacter(":id")} render={renderViewCharacterPage} />
        <Route component={NotFoundPage} />
      </Switch>

      {authStore.authenticating && <LoadingCover message="Logging in..." />}
    </div>
  </BrowserRouter>
))

const renderViewCharacterPage = ({ match }: RouteComponentProps<{ id: string }>) => (
  <CharacterPage key={match.params.id} id={match.params.id} />
)
