import { observer } from "mobx-react"
import * as React from "react"
import styled from "react-emotion"

import { ClientUserData } from "../../shared/user/types/client-user-data"
import { preventDefault } from "./helpers/reactHelpers"
import { modalStore } from "./ModalStore"
import { buttonFlatStyle } from "./style/button"
import { foregroundColor, shadowColor } from "./style/colors"
import { userStore } from "./UserStore"

const Header = styled.header`
  background: ${foregroundColor};

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  box-shadow: 0px 0px 8px ${shadowColor};
`

const Title = styled.h1`
  padding: 0.5rem 1rem;
`

const Nav = styled.nav`
  padding: 0 0.5rem;
  display: flex;
`

const NavLink = (props: JSX.IntrinsicElements["a"]) => {
  return <a className={buttonFlatStyle} href="#" {...props} />
}

function UserLinks(props: { userData: ClientUserData }) {
  return (
    <React.Fragment>
      <NavLink onClick={preventDefault(userStore.logout)}>log out</NavLink>
      <NavLink onClick={() => alert("not implemented")}>{props.userData.displayName}</NavLink>
    </React.Fragment>
  )
}

function GuestLinks() {
  return (
    <React.Fragment>
      <NavLink onClick={preventDefault(modalStore.login.show)}>log in</NavLink>
      <NavLink onClick={preventDefault(modalStore.register.show)}>register</NavLink>
    </React.Fragment>
  )
}

@observer
export class AppHeader extends React.Component {
  render() {
    const { userData } = userStore
    const links = userData ? <UserLinks userData={userData} /> : <GuestLinks />
    return (
      <Header>
        <Title>awesome website</Title>
        <Nav>{links}</Nav>
      </Header>
    )
  }
}
