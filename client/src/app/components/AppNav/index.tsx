import { observer } from "mobx-react"
import * as React from "react"
import styled from "react-emotion"
import { Link } from "react-router-dom"

import { authStore } from "../../../auth/stores/AuthStore"
import { routePaths } from "../../../routePaths"
import { anchorPrimary, raisedPanelStyles } from "../../../ui/elements"

export const AppNav = observer(() => (
  <Panel>
    <Title>RP website</Title>
    <NavLinkList>
      <NavLink to={routePaths.home}>home</NavLink>

      {authStore.user !== null ? (
        <React.Fragment>
          <NavLink to={routePaths.characterList}>your characters</NavLink>
          <NavLink to={routePaths.browseCharacters}>browse all characters</NavLink>
          <NavLink to={routePaths.newCharacter}>new character</NavLink>
          <NavLink to="#" onClick={() => authStore.signOut()}>
            log out
          </NavLink>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <NavLink to="#" onClick={() => authStore.signIn()}>
            log in
          </NavLink>
        </React.Fragment>
      )}
    </NavLinkList>
  </Panel>
))

const Panel = styled.nav`
  ${raisedPanelStyles};

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Title = styled.h1`
  padding: 0.5rem 1rem;
`

const NavLinkList = styled.div`
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
