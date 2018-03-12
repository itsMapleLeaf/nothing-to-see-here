import React from "react"
import { Route, RouteProps } from "react-router-dom"

import { routePaths } from "../../../routePaths"
import { StoreConsumer } from "../../../storeContext"
import { PageSection, PageWrapper } from "../../../styles/layout"
import { RouterLink } from "../../../styles/link"

export const AuthRoute = (props: RouteProps) => (
  <StoreConsumer>
    {stores =>
      stores.authStore.isSignedIn ? (
        <Route {...props} />
      ) : (
        <PageWrapper>
          <PageSection>
            You must <RouterLink to={routePaths.login}>log in</RouterLink> to view this page.
          </PageSection>
        </PageWrapper>
      )
    }
  </StoreConsumer>
)
