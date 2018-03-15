import { observer } from "mobx-react"
import * as React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import { linkStyles, raisedPanelStyles } from "../../../styles/elements"

export const AppNav = observer(() => (
  <AppNavPanel>
    <AppNavTitle>RP website</AppNavTitle>
    <AppNavLinkList>
      <AppNavLink to={routePaths.home}>home</AppNavLink>

      {authStore.user !== null ? (
        <React.Fragment>
          <AppNavLink to={routePaths.characterList}>your characters</AppNavLink>
          <AppNavLink to={routePaths.browseCharacters}>browse all characters</AppNavLink>
          <AppNavLink to={routePaths.newCharacter}>new character</AppNavLink>
          <AppNavLink to="#" onClick={() => authStore.signOut()}>
            log out
          </AppNavLink>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AppNavLink to="#" onClick={() => authStore.signIn()}>
            log in
          </AppNavLink>
        </React.Fragment>
      )}
    </AppNavLinkList>
  </AppNavPanel>
))

const AppNavPanel = styled.nav`
  ${raisedPanelStyles};

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const AppNavTitle = styled.h1`
  padding: 0.5rem 1rem;
`

const AppNavLinkList = styled.div`
  padding: 0;
  margin: 0;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const AppNavLink = styled(Link)`
  ${linkStyles};

  padding: 0.5rem 1rem;
  display: block;
`
