import styled, { css } from "styled-components"

import { foregroundColor, shadowColor } from "../colors"

export const raisedPanelStyles = css`
  background-color: ${foregroundColor};
  box-shadow: 0px 0px 12px ${shadowColor};
`

export const pageWrapperStyles = css`
  margin: 1rem auto 1rem;
  width: calc(100vw - 2rem);
  max-width: 1000px;
`

export const RaisedPanel = styled.div`
  ${raisedPanelStyles};
`

export const PageWrapper = styled.main`
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
