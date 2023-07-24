import { styled } from "styled-components"
import { useGame } from "../../stores/game.store"

const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]
const defaultColor = "#000000"

type DancerProps = {
  playerId: string
}

export const Dancer = ({ playerId }: DancerProps) => {
  const game = useGame()
  const player = game.players[playerId]

  if (!player) return null

  return <Root color={colors[player.order] || defaultColor}></Root>
}

const Root = styled.div<{ color: string }>`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`
