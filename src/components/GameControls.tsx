import { useCallback, useEffect } from "react"
import { styled } from "styled-components"
import { Direction, checkIfCanMove } from "../rune/logic"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { UIControlButton } from "./ui/UIControlButton"

export const GameControls = () => {
  const game = useGame()
  const yourPlayerId = useYourPlayerId()

  const move = useCallback(
    (direction: Direction) => {
      if (!yourPlayerId) {
        return
      }

      const canMove = checkIfCanMove({ game, playerId: yourPlayerId, direction })
      if (!canMove) {
        return // TODO: display failing move
      }

      Rune.actions.move({ direction })
    },
    [game, yourPlayerId],
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

  return (
    <Root>
      <UIControlButtonTop onClick={() => move("top")} direction="top" />
      <UIControlButtonRight onClick={() => move("right")} direction="right" />
      <UIControlButtonBottom onClick={() => move("bottom")} direction="bottom" />
      <UIControlButtonLeft onClick={() => move("left")} direction="left" />
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
