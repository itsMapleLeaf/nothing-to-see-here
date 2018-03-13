import * as React from "react"

import { routePaths } from "../../../routePaths"
import {
  PageSection,
  PageTitle,
  PageWrapperPanel,
  StyledRouterLink,
} from "../../../styles/elements"

export function NotFound() {
  return (
    <PageWrapperPanel>
      <PageTitle>oops! unable to find this page</PageTitle>
      <PageSection>
        <StyledRouterLink to={routePaths.home}>Return to Home</StyledRouterLink>
      </PageSection>
    </PageWrapperPanel>
  )
}
