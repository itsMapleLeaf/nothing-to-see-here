import * as React from "react"

import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/elements/layout"
import { RouterLink } from "../../../styles/elements/link"

export function NotFound() {
  return (
    <PageWrapper>
      <PageTitle>oops! unable to find this page</PageTitle>
      <PageSection>
        <RouterLink to={routePaths.home}>Return to Home</RouterLink>
      </PageSection>
    </PageWrapper>
  )
}
