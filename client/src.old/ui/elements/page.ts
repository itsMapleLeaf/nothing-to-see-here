import styled, { css } from "react-emotion"

import { raisedPanelStyles } from "./raisedPanel"

export const pageWrapperStyles = css`
  margin: 1rem auto 1rem;
  width: calc(100vw - 2rem);
  max-width: 1000px;
`

export const PageWrapper = styled.main`
  ${pageWrapperStyles};
`

export const PageWrapperPanel = styled.main`
  ${raisedPanelStyles};
  ${pageWrapperStyles};
`

export const PageTitle = styled.h1`
  margin: 1rem;
`

export const PageSection = styled.section`
  margin: 1rem;
  /* margin-top: 1rem; */
  /* padding: 0 1rem 1rem; */
`
