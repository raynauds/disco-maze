import { create } from "zustand"
import { ModalConfig } from "./modal.types"

const MODAL_CLOSE_DELAY_MS = 3000

type ModalStoreState = {
  modal: ModalConfig | null
  isVisible: boolean
  openModal: (modal: ModalConfig) => void
  closeModal: () => void
}

const useModalStore = create<ModalStoreState>()((set) => ({
  modal: null,
  isVisible: false,
  openModal: (modal) => {
    set({ modal, isVisible: true })
  },
  closeModal: () => {
    set({ isVisible: false })
    setTimeout(() => {
      set({ modal: null })
    }, MODAL_CLOSE_DELAY_MS)
  },
}))

export const useModal = () => useModalStore((store) => store.modal)
export const useIsModalVisible = () => useModalStore((store) => store.isVisible)
export const useOpenModal = () => useModalStore((store) => store.openModal)
export const useCloseModal = () => useModalStore((store) => store.closeModal)
