import { useCallback } from "react"
import { styled } from "styled-components"
import {
  MAX_MOVE_INVENTORY_SIZE,
  MoveName,
  checkIfCanPerformMove,
  createArray,
  getMaxInventorySize,
} from "../rune/logic"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { theme } from "../theme/theme"
import { UIMove } from "./ui/UIMove"

export const MovesInventory = () => {
  const game = useGame()
  const yourPlayerId = useYourPlayerId()

  const player = yourPlayerId ? game.players[yourPlayerId] : undefined
  const moves = player?.moves || []

  const performMove = useCallback(
    (move: MoveName) => {
      const player = yourPlayerId ? game.players[yourPlayerId] : undefined
      if (!player) {
        return
      }
      const canPerformMove = checkIfCanPerformMove({ player, move })
      if (!canPerformMove) {
        return
      }
      Rune.actions.performMove({ move })
    },
    [game, yourPlayerId],
  )

  const inventorySize = getMaxInventorySize({ numberOfPlayers: Object.keys(game.players).length })

  return (
    <Root>
      {createArray(MAX_MOVE_INVENTORY_SIZE).map((_, index) => {
        const move = moves[index]
        const isDisabled = index >= inventorySize
        return (
          <UIMove
            key={index}
            id={move}
            size={"large"}
            isDisabled={isDisabled}
            onClick={
              move && !isDisabled
                ? () => {
                    performMove(move)
                  }
                : undefined
            }
          />
        )
      })}
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${theme.spacing(2)};
`
