import { styled } from "styled-components"
import { MOVE_INVENTORY_SIZE, createArray } from "../rune/logic"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { theme } from "../theme/theme"
import { UIMove } from "./ui/UIMove"

export const MovesInventory = () => {
  const game = useGame()
  const yourPlayerId = useYourPlayerId()

  const player = yourPlayerId ? game.players[yourPlayerId] : undefined
  const moves = player?.moves || []

  return (
    <Root>
      {createArray(MOVE_INVENTORY_SIZE).map((_, index) => {
        return <UIMove key={index} id={moves[index]} size="large" />
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
