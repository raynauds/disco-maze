import { useMemo } from "react"
import { styled } from "styled-components"
import { MAZE_HORIZONTAL_MARGIN_PX, useDimensions } from "../stores/dimensions.store"
import { useGame } from "../stores/game.store"
import { createArray } from "../utils.ts/array.utils"
import { MAZE_SIZE } from "../utils.ts/misc.utils"
import { Dancer } from "./ui/Dancer"
import { MazeCell } from "./ui/MazeCell"

export const Maze = () => {
  const { availableWidth, cellWidth } = useDimensions()
  const game = useGame()
  const cells = createArray(MAZE_SIZE * MAZE_SIZE).map((_, index) => ({
    id: index,
  }))

  const dancers = useMemo(() => {
    return Object.keys(game.players).map((playerId) => {
      const player = game.players[playerId]
      const xAbsolute = player.position.x * cellWidth
      const yAbsolute = player.position.y * cellWidth
      return {
        playerId,
        xAbsolute,
        yAbsolute,
      }
    })
  }, [cellWidth, game.players])

  return (
    <Root>
      <MazeArea $width={availableWidth}>
        <CellsContainer>
          {cells.map((cell) => {
            return <MazeCell key={cell.id} />
          })}
        </CellsContainer>

        {dancers.map((dancer) => {
          return (
            <DancerContainer
              key={dancer.playerId}
              $size={cellWidth}
              $xAbsolute={dancer.xAbsolute}
              $yAbsolute={dancer.yAbsolute}
            >
              <Dancer playerId={dancer.playerId} />
            </DancerContainer>
          )
        })}
      </MazeArea>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-left: ${MAZE_HORIZONTAL_MARGIN_PX}px;
  margin-right: ${MAZE_HORIZONTAL_MARGIN_PX}px;
`

const MazeArea = styled.div<{ $width: number }>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$width}px;
`

const CellsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${MAZE_SIZE}, 1fr);
  grid-template-rows: repeat(${MAZE_SIZE}, 1fr);
  width: 100%;
  height: 100%;
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
