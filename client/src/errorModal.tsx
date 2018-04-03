import React from "react"

import { extractErrorMessage } from "./helpers/errorHelpers"
import { ModalOptions, modalStore } from "./ModalStore"

export function createErrorModal(message: string): ModalOptions {
  return {
    render: modal => {
      return <div>{message}</div>
    },
  }
}

export function modalCatchHandler(error: any) {
  return Promise.resolve(extractErrorMessage(error))
    .then(createErrorModal)
    .then(modalStore.openModal)
}
