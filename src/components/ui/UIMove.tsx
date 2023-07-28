import { useMemo } from "react"
import { styled } from "styled-components"
import { images } from "../../data/images"
import { MoveName } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { UIPixelatedImage } from "./UIImage"

export type UIMoveSize = "inside-cell" | "small" | "medium" | "large"

type UIMoveProps = {
  id: MoveName
  size: UIMoveSize
  isPerformed?: boolean
}

export const UIMove = ({ id, size, isPerformed }: UIMoveProps) => {
  const { cellWidth, availableSpaceAroundMaze } = useDimensions()

  const sizes: Record<UIMoveSize, number> = useMemo(() => {
    return {
      "inside-cell": theme.ratio.imageInCell * cellWidth,
      small: availableSpaceAroundMaze * theme.availableWidthFraction.small,
      medium: availableSpaceAroundMaze * theme.availableWidthFraction.medium,
      large: availableSpaceAroundMaze * theme.availableWidthFraction.large,
    }
  }, [availableSpaceAroundMaze, cellWidth])

  return (
    <Root $size={sizes[size]} $isPerformed={isPerformed}>
      {id ? <UIPixelatedImage src={images.moves[id]} alt={`disco move: ${id}`} /> : <EmptyContent />}
      {isPerformed ? (
        <CheckIcon src={images.checkmark} alt="move slot performed" $availableSpace={availableSpaceAroundMaze} />
      ) : null}
    </Root>
  )
}

const Root = styled.div<{ $size: number; $isPerformed?: boolean }>`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`

const EmptyContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-radius: 20%;
`

const CheckIcon = styled.img<{ $availableSpace: number }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${(props) => props.$availableSpace * 0.035}px;
  height: ${(props) => props.$availableSpace * 0.035}px;
`
