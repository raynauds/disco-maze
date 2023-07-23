import { styled } from "styled-components"
import { createArray } from "../utils.ts/array.utils"
import { MAZE_SIZE } from "../utils.ts/misc.utils"
import { MazeCell } from "./ui/MazeCell"

type MazeProps = Record<string, never>

export const Maze = ({}: MazeProps) => {
  const cells = createArray(MAZE_SIZE * MAZE_SIZE)

  return (
    <Root>
      <CellsContainer>
        {cells.map(() => {
          return <MazeCell />
        })}
      </CellsContainer>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  padding-bottom: 100%;
`

const CellsContainer = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(${MAZE_SIZE}, 1fr);
  grid-template-rows: repeat(${MAZE_SIZE}, 1fr);
  border: 1px dashed lightgrey;
`
