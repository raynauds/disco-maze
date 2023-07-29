import { styled } from "styled-components"
import { images } from "../../data/images"
import { MoveName } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { UIMove } from "./UIMove"

type UICollectibleMoveProps = {
  id: MoveName
}

export const UICollectibleMove = ({ id }: UICollectibleMoveProps) => {
  const { cellWidth } = useDimensions()

  const containerSize = cellWidth * 0.5
  const imageSize = cellWidth * 0.4

  return (
    <Root $size={containerSize}>
      <UIMove id={id} size={imageSize} />
    </Root>
  )
}

const Root = styled.div<{ $size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  padding-bottom: 4px;
  background-image: url(${images.buttonIdle});
  background-size: contain;
  background-repeat: no-repeat;
`
