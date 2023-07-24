import { styled } from "styled-components"
import { useDimensions } from "../../stores/dimensions.store"
import { useGame } from "../../stores/game.store"

const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]
const defaultColor = "#000000"

type DancerProps = {
  playerId: string
}

export const Dancer = ({ playerId }: DancerProps) => {
  const { cellWidth } = useDimensions()
  const game = useGame()
  const player = game.players[playerId]

  if (!player) return null

  return <Root $size={cellWidth * 0.6} $color={colors[player.order] || defaultColor}></Root>
}

const Root = styled.div<{ $size: number; $color: string }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: ${(props) => props.$color};
  border-radius: 50%;
`
