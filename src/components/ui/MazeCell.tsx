import { styled } from "styled-components"

type MazeCellProps = Record<string, never>

export const MazeCell = ({}: MazeCellProps) => {
  return <Root></Root>
}

const Root = styled.div`
  border-style: dashed;
  border-color: lightgrey;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-width: 1px;
  border-bottom-width: 1px;
`
