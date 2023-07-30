import { useEffect, useRef } from "react"
import { useLastDanceMoveCollected, useLastDanceMovePerformed, usePlayers } from "../stores/game.store"
import { DEFAULT_AUTO_CLOSE_MS, useOpenModal } from "../modals/modal.store"
import { LastDanceMoveCollected, LastDanceMovePerformed } from "../rune/logic"

export const useDanceMoveHandler = () => {
  const openModal = useOpenModal()
  const players = usePlayers()

  const lastDanceMoveCollected = useLastDanceMoveCollected()
  const lastMovePerformedHandled = useRef<LastDanceMovePerformed | null>(null)

  const lastDanceMovePerformed = useLastDanceMovePerformed()
  const lastMoveCollectedHandled = useRef<LastDanceMoveCollected | null>(null)

  useEffect(() => {
    if (!lastDanceMovePerformed) {
      return
    }

    const player = players[lastDanceMovePerformed.performancePlayerId]
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
          type: lastDanceMovePerformed.type,
        },
      },
      {
        autoCloseMs: DEFAULT_AUTO_CLOSE_MS,
      },
    )

    lastMovePerformedHandled.current = lastDanceMovePerformed
  }, [lastDanceMovePerformed, openModal, players])

  useEffect(() => {
    if (!lastDanceMoveCollected) {
      return
    }

    const player = players[lastDanceMoveCollected.collectingPlayerId]
    if (!player) {
      return
    }

    if (
      lastDanceMoveCollected.moveName === lastMoveCollectedHandled.current?.moveName &&
      lastDanceMoveCollected.collectingPlayerId === lastMoveCollectedHandled.current?.collectingPlayerId
    ) {
      return
    }

    openModal(
      {
        type: "dance-performed",
        props: {
          moveName: lastDanceMoveCollected.moveName,
          userName: player.displayName,
          userProfilePictureSrc: player.avatarUrl,
          type: "move-learned",
        },
      },
      {
        autoCloseMs: DEFAULT_AUTO_CLOSE_MS,
      },
    )

    lastMoveCollectedHandled.current = lastDanceMoveCollected
  }, [lastDanceMoveCollected, lastDanceMovePerformed, openModal, players])
}
