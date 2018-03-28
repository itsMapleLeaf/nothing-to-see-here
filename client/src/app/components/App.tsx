import { observer } from "mobx-react"
import * as React from "react"
import { Route, RouteComponentProps, Router, Switch } from "react-router-dom"

import { AuthRoute } from "../../auth/components/AuthRoute"
import { authStore } from "../../auth/stores/AuthStore"
import { CharacterBrowsePage } from "../../character/components/CharacterBrowsePage"
import { CharacterCreatePage } from "../../character/components/CharacterCreatePage"
import { CharacterEditPage } from "../../character/components/CharacterEditPage"
import { CharacterListPage } from "../../character/components/CharacterListPage"
import { CharacterPage } from "../../character/components/CharacterPage"
import { appHistory } from "../../history"
import { routePaths } from "../../routePaths"
import { modalStore } from "../stores/ModalStore"
import { AppNav } from "./AppNav"
import { HomePage } from "./HomePage"
import { LoadingCover } from "./LoadingCover"
import { NotFoundPage } from "./NotFoundPage"

export const App = observer(() => (
  <Router history={appHistory}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppNav />

      <Switch>
        <Route exact path={routePaths.home} component={HomePage} />
        <AuthRoute exact path={routePaths.characterList} component={CharacterListPage} />
        <AuthRoute exact path={routePaths.newCharacter} component={CharacterCreatePage} />
        <AuthRoute exact path={routePaths.editCharacter(":id")} render={renderCharacterEditPage} />
        <Route exact path={routePaths.viewCharacter(":id")} render={renderViewCharacterPage} />
        <Route exact path={routePaths.browseCharacters} component={CharacterBrowsePage} />
        <Route component={NotFoundPage} />
      </Switch>

      {modalStore.render()}

      {authStore.authenticating && <LoadingCover message="Logging in..." />}
    </div>
  </Router>
))

const renderCharacterEditPage = ({ match }: RouteComponentProps<{ id: string }>) => (
  <CharacterEditPage id={match.params.id} key={match.params.id} />
)

const renderViewCharacterPage = ({ match }: RouteComponentProps<{ id: string }>) => (
  <CharacterPage key={match.params.id} id={match.params.id} />
)