import { useEffect, useRef, useState } from "react"
import { styled } from "styled-components"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { createArray } from "../utils.ts/array.utils"
import { MAZE_SIZE } from "../utils.ts/misc.utils"
import { Dancer } from "./ui/Dancer"
import { MazeCell } from "./ui/MazeCell"

export const Maze = () => {
  const cellsContainerRef = useRef<HTMLDivElement>(null) // TODO?: use a global variable to determine the size of a cell?
  const [cellsContainerSize, setCellsContainerSize] = useState(0)
  const game = useGame()
  const yourPlayerId = useYourPlayerId()

  useEffect(() => {
    if (!cellsContainerRef.current) return
    const { width, height } = cellsContainerRef.current.getBoundingClientRect()
    setCellsContainerSize(Math.min(width, height))
  }, [])

  const cells = createArray(MAZE_SIZE * MAZE_SIZE).map((_, index) => ({
    id: index,
  }))

  const cellSize = cellsContainerSize / MAZE_SIZE
  const position = yourPlayerId ? game.players[yourPlayerId]?.position : undefined
  const xAbsolute = position ? position?.x * cellSize : undefined
  const yAbsolute = position ? position?.y * cellSize : undefined

  console.log("Maze", JSON.stringify(game, null, 2))

  return (
    <Root>
      <CellsContainer ref={cellsContainerRef}>
        {cells.map((cell) => {
          return <MazeCell key={cell.id} />
        })}
      </CellsContainer>

      {typeof xAbsolute === "number" && typeof yAbsolute === "number" ? (
        <DancerContainer $size={cellSize} $xAbsolute={xAbsolute} $yAbsolute={yAbsolute}>
          <Dancer />
        </DancerContainer>
      ) : null}
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

const DancerContainer = styled.div<{ $size: number; $xAbsolute: number; $yAbsolute: number }>`
  position: absolute;
  left: ${(props) => props.$xAbsolute}px;
  top: ${(props) => props.$yAbsolute}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`
