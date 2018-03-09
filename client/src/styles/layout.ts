import styled from "styled-components"

import { backgroundColor2, shadowColor } from "./colors"

export const PageWrapper = styled.main`
  margin: auto;
  max-width: 1000px;
  background-color: ${backgroundColor2};
  box-shadow: 0px 0px 12px ${shadowColor};
`

export const PageTitle = styled.h1`
  padding: 1rem;
`

export const PageSection = styled.section`
  padding: 0 1rem 1rem;
`
