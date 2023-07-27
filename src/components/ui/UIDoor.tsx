import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { useGame } from "../../stores/game.store"
import { theme } from "../../theme/theme"
import { UIPixelatedImage } from "./UIImage"

export const UIDoor = () => {
  const game = useGame()
  const { cellWidth } = useDimensions()

  const isDoorOpen = game.bouncer?.isSatisfiedWithYourMoves

  return (
    <Root $size={cellWidth * theme.ratio.imageInCell}>
      <UIPixelatedImage src={isDoorOpen ? images.doorOpen : images.doorClosed} alt="night club door" />
    </Root>
  )
}

const Root = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`
