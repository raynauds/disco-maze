import { useEffect, useRef } from "react"
import { useLastDanceMovePerformed, usePlayers } from "../stores/game.store"
import { DEFAULT_AUTO_CLOSE_MS, useOpenModal } from "../modals/modal.store"
import { LastDanceMovePerformed } from "../rune/logic"

export const useOnMovePerformed = () => {
  const lastDanceMovePerformed = useLastDanceMovePerformed()
  const openModal = useOpenModal()
  const lastMovePerformedHandled = useRef<LastDanceMovePerformed | null>(null)
  const players = usePlayers()

  useEffect(() => {
    if (!lastDanceMovePerformed) {
      return
    }

    const player = players[lastDanceMovePerformed.performancPlayerId]
    if (!player) {
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
          userName: player.displayName,
          userProfilePictureSrc: player.avatarUrl,
          type: "move-learned",
        },
      },
      {
        // autoCloseMs: DEFAULT_AUTO_CLOSE_MS,
      },
    )
    lastMovePerformedHandled.current = lastDanceMovePerformed
  }, [lastDanceMovePerformed, openModal, players])
}
