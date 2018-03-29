import { observer } from "mobx-react"
import * as React from "react"
import styled from "react-emotion"
import { Link, Route, Router, Switch } from "react-router-dom"

import { authStore } from "../../auth/stores/AuthStore"
import { appHistory } from "../../history"
import { ModalRenderer } from "../../modal/components/ModalRenderer"
import { modalStore } from "../../modal/stores/ModalStore"
import { routePaths } from "../../routePaths"
import { anchorPrimary, raisedPanelStyles } from "../../ui/elements"
import { HomePage } from "./HomePage"
import { LoadingCover } from "./LoadingCover"
import { NotFoundPage } from "./NotFoundPage"

const NavPanel = styled.nav`
  ${raisedPanelStyles};

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const NavTitle = styled.h1`
  padding: 0.5rem 1rem;
`

const NavLinkSection = styled.section`
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const NavLink = styled(Link)`
  ${anchorPrimary};
  padding: 0.5rem 1rem;
  display: block;
`

const AppNav = observer(() => (
  <NavPanel>
    <NavTitle>RP website</NavTitle>
    <NavLinkSection>
      <NavLink to={routePaths.home}>home</NavLink>

      {authStore.signedIn ? (
        <React.Fragment>
          <NavLink to="#" onClick={() => authStore.signOut()}>
            log out
          </NavLink>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink to="#" onClick={modalStore.login.show}>
            log in
          </NavLink>
          <NavLink to="#" onClick={modalStore.register.show}>
            register
          </NavLink>
        </React.Fragment>
      )}
    </NavLinkSection>
  </NavPanel>
))

export const App = observer(() => (
  <Router history={appHistory}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AppNav />

      <Switch>
        <Route exact path={routePaths.home} component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>

      <ModalRenderer />

      {authStore.authenticating && <LoadingCover message="Logging in..." />}
    </div>
  </Router>
))
