import { observer } from "mobx-react"
import * as React from "react"
import { Route, RouteProps } from "react-router-dom"

import { PageSection, PageWrapperPanel } from "../../ui/elements"
import { authStore } from "../stores/AuthStore"

const AuthPermissionErrorPage = () => (
  <PageWrapperPanel>
    <PageSection>You must be logged in to view this page.</PageSection>
  </PageWrapperPanel>
)

export const AuthRoute = observer((props: RouteProps) => {
  if (authStore.authenticating) {
    return null
  }
  if (!authStore.signedIn) {
    return <AuthPermissionErrorPage />
  }
  return <Route {...props} />
})
