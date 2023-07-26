import { useMemo } from "react"
import { styled } from "styled-components"
import { Move } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { log } from "../../utils.ts/debug.utils"

type UIMoveSize = "inside-cell" | "medium" | "large"

type UIMoveProps = {
  id?: Move
  size: UIMoveSize
}

export const UIMove = ({ id, size }: UIMoveProps) => {
  const { availableWidth, cellWidth, aspectRatio } = useDimensions()

  const sizes: Record<UIMoveSize, number> = useMemo(() => {
    const height = availableWidth / aspectRatio
    const availableSpace = Math.min(height - availableWidth, availableWidth)
    console.log({ height })

    return {
      "inside-cell": 0.6 * cellWidth,
      medium: availableSpace * 0.1,
      large: availableSpace * 0.15,
    }
  }, [aspectRatio, availableWidth, cellWidth])

  if (size === "large") {
    log(aspectRatio, sizes[size])
  }

  return <Root $size={sizes[size]}>{id || ""}</Root>
}

const Root = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: lightgray;
  border-radius: 4px;
`
