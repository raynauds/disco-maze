import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { UIPixelatedImage } from "./UIImage"

export const UIBouncer = () => {
  const { cellWidth } = useDimensions()

  return (
    <Root $size={cellWidth * theme.ratio.imageInCell}>
      <UIPixelatedImage src={images.bouncer} alt="bouncer" />
    </Root>
  )
}

const Root = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`
