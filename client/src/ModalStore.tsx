import { action, computed, observable } from "mobx"
import React from "react"

import { Modal } from "./Modal"

let nextModalId = 0

interface ModalState {
  id: number
  render: (context: ModalState) => React.ReactNode
  close: () => void
  closeOnShadeClick?: boolean
}

export type ModalOptions = Pick<ModalState, "render" | "closeOnShadeClick">

export class ModalStore {
  modals = observable.map<ModalState["id"], ModalState>()

  @action.bound
  openModal({ render, closeOnShadeClick = true }: ModalOptions) {
    const id = nextModalId++
    const close = () => this.closeModal(id)
    this.modals.set(id, { id, render, closeOnShadeClick, close })
  }

  @action.bound
  closeModal(id: ModalState["id"]) {
    this.modals.delete(id)
  }

  @computed
  get modalElements() {
    return [...this.modals.values()].map(modal => {
      const onShadeClick = modal.closeOnShadeClick ? modal.close : undefined
      return (
        <Modal key={modal.id} onShadeClick={onShadeClick}>
          {modal.render(modal)}
        </Modal>
      )
    })
  }
}

export const modalStore = new ModalStore()
