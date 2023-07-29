import { useCallback, useEffect, useState } from "react"
import { styled } from "styled-components"
import { DELAY_BETWEEN_MOVES_MS, Direction, checkIfCanMove } from "../rune/logic"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { UIControlButton } from "./ui/UIControlButton"

export const GameControls = () => {
  const game = useGame()
  const yourPlayerId = useYourPlayerId()

  const [lastMoveTimestamp, setLastMoveTimestamp] = useState(0)

  const move = useCallback(
    (direction: Direction) => {
      if (!yourPlayerId) {
        return
      }

      const currentTimestamp = Date.now()
      const timeSinceLastMoveMs = currentTimestamp - lastMoveTimestamp
      const isDelayBetweenMovesPassed = timeSinceLastMoveMs > DELAY_BETWEEN_MOVES_MS
      if (!isDelayBetweenMovesPassed) {
        return
      }

      const canMove = checkIfCanMove({ game, playerId: yourPlayerId, direction })
      if (!canMove) {
        return // TODO: display failing move
      }

      try {
        Rune.actions.move({ direction })
        setLastMoveTimestamp(Date.now())
      } catch {}
    },
    [game, yourPlayerId, lastMoveTimestamp],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          move("top")
          break
        case "ArrowRight":
          move("right")
          break
        case "ArrowDown":
          move("bottom")
          break
        case "ArrowLeft":
          move("left")
          break
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [move])

  const actionFrequencyMs = DELAY_BETWEEN_MOVES_MS * 2

  return (
    <Root>
      <UIControlButtonTop onClick={() => move("top")} direction="top" actionFrequencyMs={actionFrequencyMs} />
      <UIControlButtonRight onClick={() => move("right")} direction="right" actionFrequencyMs={actionFrequencyMs} />
      <UIControlButtonBottom onClick={() => move("bottom")} direction="bottom" actionFrequencyMs={actionFrequencyMs} />
      <UIControlButtonLeft onClick={() => move("left")} direction="left" actionFrequencyMs={actionFrequencyMs} />
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const UIControlButtonLeft = styled(UIControlButton)`
  grid-column: 1;
  grid-row: 2;
`

const UIControlButtonRight = styled(UIControlButton)`
  grid-column: 3;
  grid-row: 2;
`

const UIControlButtonTop = styled(UIControlButton)`
  grid-column: 2;
  grid-row: 1;
`

const UIControlButtonBottom = styled(UIControlButton)`
  grid-column: 2;
  grid-row: 3;
`
