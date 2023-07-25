import { useMemo } from "react"
import { styled } from "styled-components"
import { MAZE_SIZE, getVisibleCells } from "../rune/logic"
import { MAZE_HORIZONTAL_MARGIN_PX, useDimensions } from "../stores/dimensions.store"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { log } from "../utils.ts/debug.utils"
import { Dancer } from "./ui/Dancer"
import { MazeCell } from "./ui/MazeCell"

export const Maze = () => {
  const { availableWidth, cellWidth } = useDimensions()
  const game = useGame()
  const yourPlayerId = useYourPlayerId()

  const cells = game.maze.flat()

  const dancers = useMemo(() => {
    return Object.keys(game.players).map((playerId) => {
      const player = game.players[playerId]
      const xAbsolute = player.position.x * cellWidth
      const yAbsolute = player.position.y * cellWidth
      return {
        playerId,
        player,
        xAbsolute,
        yAbsolute,
      }
    })
  }, [cellWidth, game.players])

  const visibleCells = useMemo(() => {
    const player = yourPlayerId ? game.players[yourPlayerId] : undefined
    if (!player) {
      return []
    }
    return getVisibleCells({
      game,
      observerPosition: player.position,
    })
  }, [game, yourPlayerId])
  log(visibleCells.sort((a, b) => a.x - b.x || a.y - b.y))
  return (
    <Root>
      <MazeArea $width={availableWidth}>
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

        <CellsContainer>
          {cells.map((cell, index) => {
            const x = index % MAZE_SIZE
            const y = Math.floor(index / MAZE_SIZE)
            const isVisible = visibleCells.some((visibleCell) => visibleCell.x === x && visibleCell.y === y)
            return <MazeCell key={index} cell={cell} isVisible={isVisible} />
          })}
        </CellsContainer>
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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(${MAZE_SIZE}, 1fr);
  grid-template-rows: repeat(${MAZE_SIZE}, 1fr);
  width: 100%;
  height: 100%;
  border: 1px solid lightgrey;
`

const DancerContainer = styled.div<{ $size: number; $xAbsolute: number; $yAbsolute: number }>`
  position: absolute;
  top: ${(props) => props.$yAbsolute}px;
  left: ${(props) => props.$xAbsolute}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`
