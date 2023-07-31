import { useMemo } from "react"
import { styled } from "styled-components"
import { images } from "../../data/images"
import { Cell } from "../../rune/logic"
import { UIImage } from "./UIImage"

type UIMazeCellProps = {
  cell: Cell
}

export const UIMazeCell = ({ cell }: UIMazeCellProps) => {
  const imageSource = useMemo(() => {
    const { top, right, bottom, left } = cell
    const pattern = [top, right, bottom, left].map((hasWall) => (hasWall ? 1 : 0)).join("")
    if (pattern === "0000") return images.walls.none
    if (pattern === "0001") return images.walls.left
    if (pattern === "0010") return images.walls.bottom
    if (pattern === "0011") return images.walls.bottomLeft
    if (pattern === "0100") return images.walls.right
    if (pattern === "0101") return images.walls.rightLeft
    if (pattern === "0110") return images.walls.rightBottom
    if (pattern === "0111") return images.walls.rightBottomLeft
    if (pattern === "1000") return images.walls.top
    if (pattern === "1001") return images.walls.topLeft
    if (pattern === "1010") return images.walls.topBottom
    if (pattern === "1011") return images.walls.topBottomLeft
    if (pattern === "1100") return images.walls.topRight
    if (pattern === "1101") return images.walls.topRightLeft
    if (pattern === "1110") return images.walls.topRightBottom
    return images.walls.top
  }, [cell])

  return <Root src={imageSource} alt=""></Root>
}

const Root = styled(UIImage)`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`
