import React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import { CharacterListFetcher } from "../../../character/components/CharacterListFetcher"
import { Dropdown } from "../../../common/components/Dropdown"
import { firebase } from "../../../firebase"
import { routePaths } from "../../../routePaths"
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
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loggedIn: user != null })
    })
  }

  signIn = () => {
    const email = prompt("Email?")
    const password = prompt("Password?")
    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          alert(err)
        })
    }
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <Nav>
        <NavBrand>
          <Link to={routePaths.home}>
            <h1>RP website</h1>
          </Link>
        </NavBrand>

        <NavLinks>
          {this.state.loggedIn ? this.renderLoggedInLinks() : this.renderLoggedOutLinks()}
        </NavLinks>
      </Nav>
    )
  }

  renderLoggedInLinks() {
    return (
      <React.Fragment>
        <RouterNavLink to={routePaths.home}>
          <span>
            <i className="fas fa-home" /> Home
          </span>
        </RouterNavLink>

        <Dropdown
          head={
            <NavLink style={{ height: "100%" }}>
              <span>
                <i className="fas fa-users" /> Characters
              </span>
            </NavLink>
          }
          content={
            <DropdownContentWrapper>
              <hr />
              <RouterNavLink to={routePaths.characterList}>Your Characters</RouterNavLink>
              <hr />
              <CharacterListFetcher>
                {characters =>
                  characters.map(c => (
                    <RouterNavLink to={routePaths.viewCharacter(c.id)} key={c.id}>
                      {c.name}
                    </RouterNavLink>
                  ))
                }
              </CharacterListFetcher>
            </DropdownContentWrapper>
          }
        />

        <RouterNavLink to={routePaths.chat}>
          <span>
            <i className="fas fa-comments" /> Chat
          </span>
        </RouterNavLink>

        <NavLink onClick={this.signOut}>
          <span>
            <i className="fas fa-sign-out-alt" /> Log out
          </span>
        </NavLink>
      </React.Fragment>
    )
  }

  renderLoggedOutLinks() {
    return (
      <React.Fragment>
        <NavLink onClick={this.signIn}>
          <span>
            <i className="fas fa-sign-in-alt" /> Log in
          </span>
        </NavLink>
      </React.Fragment>
    )
  }
}
