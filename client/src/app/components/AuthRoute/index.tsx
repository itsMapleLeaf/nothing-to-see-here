import * as React from "react"
import { Route, RouteProps } from "react-router-dom"

import { StoreConsumer } from "../../../storeContext"
import { PageSection, PageWrapperPanel, StyledLink } from "../../../styles/elements"

export const AuthRoute = (props: RouteProps) => (
  <StoreConsumer>
    {stores =>
      stores.authStore.isSignedIn ? (
        <Route {...props} />
      ) : (
        <PageWrapperPanel>
          <PageSection>
            You must <StyledLink onClick={stores.appViewStore.showLogin}>log in</StyledLink> to view
            this page.
          </PageSection>
        </PageWrapperPanel>
      )
    }
  </StoreConsumer>
)
