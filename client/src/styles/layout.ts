import styled from "styled-components"

import { backgroundColor2, shadowColor } from "./colors"

export const PageWrapper = styled.main`
  margin: 0 auto 1rem;
  width: calc(100vw - 2rem);
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
