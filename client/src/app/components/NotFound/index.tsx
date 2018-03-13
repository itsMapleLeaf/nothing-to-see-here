import * as React from "react"

import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapperPanel, RouterLink } from "../../../styles/elements"

export function NotFound() {
  return (
    <PageWrapperPanel>
      <PageTitle>oops! unable to find this page</PageTitle>
      <PageSection>
        <RouterLink to={routePaths.home}>Return to Home</RouterLink>
      </PageSection>
    </PageWrapperPanel>
  )
}
