import { useMemo } from "react"
import { styled } from "styled-components"
import { images } from "../../data/images"
import { MoveName } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { UIPixelatedImage } from "./UIImage"

type UIMoveSize = "inside-cell" | "small" | "medium" | "large"

type UIMoveProps = {
  id?: MoveName
  size: UIMoveSize
  isPerformed?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

export const UIMove = ({ id, size, isPerformed, isDisabled, onClick }: UIMoveProps) => {
  const { availableWidth, cellWidth, aspectRatio } = useDimensions()

  const sizes: Record<UIMoveSize, number> = useMemo(() => {
    const height = availableWidth / aspectRatio
    const availableSpace = Math.min(height - availableWidth, availableWidth)

    return {
      "inside-cell": theme.ratio.imageInCell * cellWidth,
      small: availableSpace * theme.availableWidthFraction.small,
      medium: availableSpace * theme.availableWidthFraction.medium,
      large: availableSpace * theme.availableWidthFraction.large,
    }
  }, [aspectRatio, availableWidth, cellWidth])

  const content = (
    <Root $size={sizes[size]} $isPerformed={isPerformed}>
      {id ? <UIPixelatedImage src={images.moves[id]} alt={`disco move: ${id}`} /> : <EmptyContent />}
      {isDisabled ? <MoveSlotDisabledIcon src={images.locked} alt="move slot unavailable" /> : null}
    </Root>
  )

  return onClick ? <button onClick={onClick}>{content}</button> : content
}

const Root = styled.div<{ $size: number; $isPerformed?: boolean }>`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border: ${(props) => (props.$isPerformed ? "2px solid green" : "none")};
`

const EmptyContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-radius: 20%;
`

const MoveSlotDisabledIcon = styled(UIPixelatedImage)`
  position: absolute;
  inset: 0;
`
