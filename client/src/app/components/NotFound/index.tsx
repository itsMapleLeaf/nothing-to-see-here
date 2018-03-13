import * as React from "react"

import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapperPanel } from "../../../styles/elements/page"
import { RouterLink } from "../../../styles/elements/link"

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
