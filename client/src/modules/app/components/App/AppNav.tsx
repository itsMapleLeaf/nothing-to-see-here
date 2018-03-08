import { Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core"
import React from "react"
import { Link } from "react-router-dom"
import { routePaths } from "src/routePaths"

export class AppNav extends React.Component {
  render() {
    return (
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>
            <Link to={routePaths.home}>
              <h2>awesome RP website</h2>
            </Link>
          </NavbarHeading>

          <NavbarDivider />

          <Link to={routePaths.home}>
            <Button className={Classes.MINIMAL} text="Home" />
          </Link>

          <Link to={routePaths.characterList}>
            <Button className={Classes.MINIMAL} text="Characters" />
          </Link>
        </NavbarGroup>
      </Navbar>
    )
  }
}
