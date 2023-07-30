import { DancePerformedModalProps } from "./components/DancePerformedModal"

// Add other modal configs here in union types
export type ModalConfig =
  | {
      type: "dance-performed"
      props: DancePerformedModalProps
    }
  | {
      type: "game-information"
    }
