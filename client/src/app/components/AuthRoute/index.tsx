import * as React from "react"
import { Route, RouteProps } from "react-router-dom"

import { StoreConsumer } from "../../../storeContext"
import { PageSection, PageWrapper } from "../../../styles/layout"
import { Link } from "../../../styles/link"

export const AuthRoute = (props: RouteProps) => (
  <StoreConsumer>
    {stores =>
      stores.authStore.isSignedIn ? (
        <Route {...props} />
      ) : (
        <PageWrapper>
          <PageSection>
            You must <Link onClick={stores.appViewStore.showLogin}>log in</Link> to view this page.
          </PageSection>
        </PageWrapper>
      )
    }
  </StoreConsumer>
)
