import { create } from "zustand"
import { ModalConfig } from "./modal.types"

export const DEFAULT_AUTO_CLOSE_MS = 2500

type OpenModalOptions = {
  autoCloseMs?: number
}

type ModalStoreState = {
  modal: ModalConfig | null
  isVisible: boolean
  openModal: (modal: ModalConfig, options?: OpenModalOptions) => void
  closeModal: () => void
}

const useModalStore = create<ModalStoreState>()((set) => ({
  modal: null,
  isVisible: false,
  openModal: (modal, options) => {
    set({ modal, isVisible: true })
    if (options?.autoCloseMs) {
      setTimeout(() => {
        set({ isVisible: false })
      }, options.autoCloseMs)
    }
  },
  closeModal: () => {
    set({ isVisible: false })
  },
}))

export const useModal = () => useModalStore((store) => store.modal)
export const useIsModalVisible = () => useModalStore((store) => store.isVisible)
export const useOpenModal = () => useModalStore((store) => store.openModal)
export const useCloseModal = () => useModalStore((store) => store.closeModal)
