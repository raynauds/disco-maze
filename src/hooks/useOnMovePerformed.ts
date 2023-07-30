import { useEffect, useRef } from "react"
import { useLastDanceMovePerformed } from "../stores/game.store"
import { DEFAULT_AUTO_CLOSE_MS, useOpenModal } from "../modals/modal.store"
import { LastDanceMovePerformed } from "../rune/logic"

export const useOnMovePerformed = () => {
  const lastDanceMovePerformed = useLastDanceMovePerformed()
  const openModal = useOpenModal()
  const lastMovePerformedHandled = useRef<LastDanceMovePerformed | null>(null)

  useEffect(() => {
    if (!lastDanceMovePerformed) {
      return
    }

    if (
      lastDanceMovePerformed.moveName === lastMovePerformedHandled.current?.moveName &&
      lastDanceMovePerformed.performanceTimeSeconds === lastMovePerformedHandled.current?.performanceTimeSeconds
    ) {
      return
    }

    openModal(
      {
        type: "dance-performed",
        props: {
          moveName: lastDanceMovePerformed.moveName,
          userName: "John Doe",
        },
      },
      {
        autoCloseMs: DEFAULT_AUTO_CLOSE_MS,
      },
    )
    lastMovePerformedHandled.current = lastDanceMovePerformed
  }, [lastDanceMovePerformed, openModal])
}
