import { styled } from "styled-components"
import { Cell } from "../../rune/logic"

type UIMazeCellProps = {
  cell: Cell
  isVisible: boolean
}

export const UIMazeCell = ({ cell, isVisible }: UIMazeCellProps) => {
  return (
    <Root $top={cell.top} $right={cell.right} $bottom={cell.bottom} $left={cell.left} $isVisible={isVisible}></Root>
  )
}

const MAZE_CELL_BORDER_WIDTH = "3px"

const Root = styled.div<{
  $top: boolean
  $right: boolean
  $bottom: boolean
  $left: boolean
  $isVisible: boolean
}>`
  border-style: solid;
  border-color: lightgrey;
  border-top-width: ${(props) => (props.$top ? MAZE_CELL_BORDER_WIDTH : 0)};
  border-right-width: ${(props) => (props.$right ? MAZE_CELL_BORDER_WIDTH : 0)};
  border-bottom-width: ${(props) => (props.$bottom ? MAZE_CELL_BORDER_WIDTH : 0)};
  border-left-width: ${(props) => (props.$left ? MAZE_CELL_BORDER_WIDTH : 0)};
  background-color: ${(props) => (props.$isVisible ? "transparent" : "rgba(0, 0, 0, 0.3)")};
`
