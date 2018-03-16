import * as React from "react"
import { PageSection, PageWrapperPanel } from "../../../ui/elements"

export function ErrorPage(props: { message: string; error: any }) {
  const errorMessage = props.error.message || String(props.error)
  return (
    <PageWrapperPanel>
      <PageSection>
        {props.message} Error: {errorMessage}
      </PageSection>
    </PageWrapperPanel>
  )
}
