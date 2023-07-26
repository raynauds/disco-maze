import { useMemo } from "react"
import { styled } from "styled-components"
import { MoveName } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"

type UIMoveSize = "inside-cell" | "small" | "medium" | "large"

type UIMoveProps = {
  id?: MoveName
  size: UIMoveSize
  isPerformed?: boolean
  onClick?: () => void
}

export const UIMove = ({ id, size, isPerformed, onClick }: UIMoveProps) => {
  const { availableWidth, cellWidth, aspectRatio } = useDimensions()

  const sizes: Record<UIMoveSize, number> = useMemo(() => {
    const height = availableWidth / aspectRatio
    const availableSpace = Math.min(height - availableWidth, availableWidth)

    return {
      "inside-cell": 0.6 * cellWidth,
      small: availableSpace * 0.07,
      medium: availableSpace * 0.1,
      large: availableSpace * 0.15,
    }
  }, [aspectRatio, availableWidth, cellWidth])

  return (
    <Root onClick={onClick} $size={sizes[size]} $isPerformed={isPerformed}>
      {id || ""}
    </Root>
  )
}

const Root = styled.button<{ $size: number; $isPerformed?: boolean }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: lightgray;
  border-radius: 4px;
  border: ${(props) => (props.$isPerformed ? "2px solid green" : "none")};
`
