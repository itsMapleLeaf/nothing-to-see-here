import React from "react"
import { Link } from "react-router-dom"

import { routePaths } from "../../../routePaths"
import { PageSection, PageTitle, PageWrapper } from "../../../styles/layout"

export function NotFound() {
  return (
    <PageWrapper>
      <PageTitle className="title">oops! unable to find this page</PageTitle>
      <PageSection>
        <Link to={routePaths.home} className="subtitle">
          Return to Home
        </Link>
      </PageSection>
    </PageWrapper>
  )
}
