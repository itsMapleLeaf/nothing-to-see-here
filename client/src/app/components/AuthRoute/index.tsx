import * as React from "react"
import { Route, RouteProps } from "react-router-dom"

import { StoreConsumer } from "../../../storeContext"
import { Link, PageSection, PageWrapperPanel } from "../../../styles/elements"

export const AuthRoute = (props: RouteProps) => (
  <StoreConsumer>
    {stores =>
      stores.authStore.isSignedIn ? (
        <Route {...props} />
      ) : (
        <PageWrapperPanel>
          <PageSection>
            You must <Link onClick={stores.appViewStore.showLogin}>log in</Link> to view this page.
          </PageSection>
        </PageWrapperPanel>
      )
    }
  </StoreConsumer>
)
