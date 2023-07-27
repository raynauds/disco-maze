import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { useGame } from "../../stores/game.store"
import { theme } from "../../theme/theme"
import { UIPixelatedImage } from "./UIImage"

type UIDancerProps = {
  playerId: string
}

export const UIDancer = ({ playerId }: UIDancerProps) => {
  const { cellWidth } = useDimensions()
  const game = useGame()
  const player = game.players[playerId]

  if (!player) return null

  return (
    <Root $size={cellWidth * theme.ratio.imageInCell}>
      <UIPixelatedImage src={images.dancers[player.order - 1]} alt={`player ${player.order}`} />
    </Root>
  )
}

const Root = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`
