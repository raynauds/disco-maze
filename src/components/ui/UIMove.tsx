import { styled } from "styled-components"
import { Move } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"

type UIMoveSize = "small" | "medium" | "large"

type UIMoveProps = {
  id?: Move
  size: UIMoveSize
}

export const UIMove = ({ id, size }: UIMoveProps) => {
  const { cellWidth } = useDimensions()

  const sizePx = moveSizesRelativeToCellWidth[size] * cellWidth

  return <Root $size={sizePx}>{id || ""}</Root>
}

const Root = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: lightgray;
  border-radius: 4px;
`
const moveSizesRelativeToCellWidth: Record<UIMoveSize, number> = {
  small: 0.6,
  medium: 0.8,
  large: 1.5,
}
