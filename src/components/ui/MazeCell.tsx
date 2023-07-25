import { styled } from "styled-components"
import { Cell } from "../../rune/logic"

type MazeCellProps = {
  cell: Cell
}

export const MazeCell = ({ cell }: MazeCellProps) => {
  return <Root $top={cell.top} $right={cell.right} $bottom={cell.bottom} $left={cell.left}></Root>
}

const Root = styled.div<{
  $top: boolean
  $right: boolean
  $bottom: boolean
  $left: boolean
}>`
  border-style: solid;
  border-color: lightgrey;
  border-top-width: ${(props) => (props.$top ? "1px" : 0)};
  border-right-width: ${(props) => (props.$right ? "1px" : 0)};
  border-bottom-width: ${(props) => (props.$bottom ? "1px" : 0)};
  border-left-width: ${(props) => (props.$left ? "1px" : 0)};
`
