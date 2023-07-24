import { useEffect, useMemo, useRef, useState } from "react"
import { styled } from "styled-components"
import { useGame } from "../stores/game.store"
import { createArray } from "../utils.ts/array.utils"
import { MAZE_SIZE } from "../utils.ts/misc.utils"
import { Dancer } from "./ui/Dancer"
import { MazeCell } from "./ui/MazeCell"

export const Maze = () => {
  const cellsContainerRef = useRef<HTMLDivElement>(null) // TODO?: use a global variable to determine the size of a cell?
  const [cellsContainerSize, setCellsContainerSize] = useState(0)
  const game = useGame()

  useEffect(() => {
    if (!cellsContainerRef.current) return

    const onResize = () => {
      if (!cellsContainerRef.current) return
      const { width, height } = cellsContainerRef.current.getBoundingClientRect()
      setCellsContainerSize(Math.min(width, height))
      console.log("resize")
    }

    cellsContainerRef.current.addEventListener("resize", onResize) // TODO!: fix (not working)
    onResize()
  }, [])

  const cells = createArray(MAZE_SIZE * MAZE_SIZE).map((_, index) => ({
    id: index,
  }))

  const cellSize = cellsContainerSize / MAZE_SIZE

  const dancers = useMemo(() => {
    return Object.keys(game.players).map((playerId) => {
      const player = game.players[playerId]
      const xAbsolute = player.position.x * cellSize
      const yAbsolute = player.position.y * cellSize
      return {
        playerId,
        xAbsolute,
        yAbsolute,
      }
    })
  }, [cellSize, game.players])

  return (
    <Root>
      <CellsContainer ref={cellsContainerRef}>
        {cells.map((cell) => {
          return <MazeCell key={cell.id} />
        })}
      </CellsContainer>

      {dancers.map((dancer) => {
        return (
          <DancerContainer
            key={dancer.playerId}
            $size={cellSize}
            $xAbsolute={dancer.xAbsolute}
            $yAbsolute={dancer.yAbsolute}
          >
            <Dancer playerId={dancer.playerId} />
          </DancerContainer>
        )
      })}
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
