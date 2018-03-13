import * as React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { Dropdown } from "../../../common/components/Dropdown"
import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { foregroundColor, foregroundColorHighlight, shadowColor } from "../../../styles/colors"

const Nav = styled.nav`
  background-color: ${foregroundColor};
  box-shadow: 0px 0px 8px ${shadowColor};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  flex-shrink: 0;
`

const NavBrand = styled.section`
  h1 {
    margin: 0;
    padding: 0.5rem 1rem;
  }
`

const NavLinks = styled.section`
  padding-right: 1rem;
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
`

const navLinkStyles = css`
  padding: 0.5rem 0.8rem;

  display: flex;
  align-items: center;

  background-color: ${foregroundColor};

  user-select: none;

  &:hover {
    background-color: ${foregroundColorHighlight};
  }

  span {
    word-break: keep-all;
  }
`

const NavLink = styled.a`
  ${navLinkStyles};
  cursor: pointer;
`

const RouterNavLink = styled(Link)`
  ${navLinkStyles};
`

const DropdownContentWrapper = styled.div`
  background: ${foregroundColor};
  box-shadow: 0px 0px 8px ${shadowColor};
`

export class AppNav extends React.Component {
  render() {
    return (
      <Nav>
        <NavBrand>
          <Link to={routePaths.home}>
            <h1>RP website</h1>
          </Link>
        </NavBrand>

        <StoreConsumer>
          {({ authStore }) => (
            <NavLinks>
              {authStore.isSignedIn ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
            </NavLinks>
          )}
        </StoreConsumer>
      </Nav>
    )
  }

  renderLoggedInLinks() {
    return (
      <React.Fragment key="logged-in-links">
        <Dropdown
          head={
            <NavLink style={{ height: "100%" }}>
              {/* NOTE: this span needs to be here to preserve the space between the icon and text */}
              <span>
                <i className="fas fa-users" /> Characters
              </span>
            </NavLink>
          }
          content={
            <DropdownContentWrapper>
              <RouterNavLink to={routePaths.characterList}>Your Characters</RouterNavLink>
              <hr />
              {this.renderCharacterLinks()}
            </DropdownContentWrapper>
          }
        />

        <RouterNavLink to={routePaths.chat}>
          <span>
            <i className="fas fa-comments" /> Chat
          </span>
        </RouterNavLink>

        <StoreConsumer>
          {({ authStore }) => (
            <NavLink onClick={() => authStore.signOut()}>
              <span>
                <i className="fas fa-sign-out-alt" /> Log out
              </span>
            </NavLink>
          )}
        </StoreConsumer>
      </React.Fragment>
    )
  }

  renderLoggedOutLinks() {
    return (
      <React.Fragment key="logged-out-links">
        <RouterNavLink to={routePaths.login}>
          <span>
            <i className="fas fa-sign-in-alt" /> Log in
          </span>
        </RouterNavLink>
      </React.Fragment>
    )
  }

  renderCharacterLinks() {
    return (
      <StoreConsumer>
        {({ characterListStore }) =>
          characterListStore.characters.map(character => (
            <RouterNavLink to={routePaths.viewCharacter(character.id)} key={character.id}>
              {character.name}
            </RouterNavLink>
          ))
        }
      </StoreConsumer>
    )
  }
}
