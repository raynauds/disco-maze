import { useMemo } from "react"
import { styled } from "styled-components"
import { MAZE_SIZE, getVisibleCells } from "../rune/logic"
import { MAZE_HORIZONTAL_MARGIN_PX, useDimensions } from "../stores/dimensions.store"
import { useCurrentLevel, useGame, useYourPlayerId } from "../stores/game.store"
import { UIBouncer } from "./ui/UIBouncer"
import { UIDancer } from "./ui/UIDancer"
import { UIDoor } from "./ui/UIDoor"
import { UIMazeCell } from "./ui/UIMazeCell"
import { UIMove } from "./ui/UIMove"

export const Maze = () => {
  const { availableWidth, cellWidth } = useDimensions()
  const yourPlayerId = useYourPlayerId()
  const game = useGame()
  const { players } = game
  const level = useCurrentLevel()
  const { maze, bouncer, door, move } = level
  const cells = maze.flat()

  const dancers = useMemo(() => {
    return Object.keys(players).map((playerId) => {
      const player = players[playerId]
      const xAbsolute = player.position.x * cellWidth
      const yAbsolute = player.position.y * cellWidth
      return {
        playerId,
        player,
        xAbsolute,
        yAbsolute,
      }
    })
  }, [cellWidth, players])

  const visibleCells = useMemo(() => {
    const player = yourPlayerId ? players[yourPlayerId] : undefined
    if (!player) {
      return []
    }
    return getVisibleCells({
      level,
      observerPosition: player.position,
    })
  }, [level, players, yourPlayerId])

  const isBouncerHidden = bouncer.isSatisfiedWithYourMoves

  return (
    <Root>
      <MazeArea $width={availableWidth - 2 * MAZE_HORIZONTAL_MARGIN_PX}>
        {bouncer && !isBouncerHidden ? (
          <ElementContainer
            $size={cellWidth}
            $xAbsolute={bouncer.position.x * cellWidth}
            $yAbsolute={bouncer.position.y * cellWidth}
          >
            <UIBouncer />
          </ElementContainer>
        ) : null}

        {door ? (
          <ElementContainer
            $size={cellWidth}
            $xAbsolute={door.position.x * cellWidth}
            $yAbsolute={door.position.y * cellWidth}
          >
            <UIDoor />
          </ElementContainer>
        ) : null}

        {move && !move.isCollected ? (
          <ElementContainer
            $size={cellWidth}
            $xAbsolute={move.position.x * cellWidth}
            $yAbsolute={move.position.y * cellWidth}
          >
            <UIMove id={move.id} size="inside-cell" />
          </ElementContainer>
        ) : null}

        {dancers.map((dancer) => {
          if (dancer.player.hasFoundDoor) {
            return null
          }
          return (
            <ElementContainer
              key={dancer.playerId}
              $size={cellWidth}
              $xAbsolute={dancer.xAbsolute}
              $yAbsolute={dancer.yAbsolute}
            >
              <UIDancer playerId={dancer.playerId} />
            </ElementContainer>
          )
        })}

        <CellsContainer $cellWidth={cellWidth}>
          {cells.map((cell, index) => {
            const x = index % MAZE_SIZE
            const y = Math.floor(index / MAZE_SIZE)
            const isVisible = visibleCells.some((visibleCell) => visibleCell.x === x && visibleCell.y === y)
            return <UIMazeCell key={index} cell={cell} isVisible={isVisible} />
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
  padding-left: ${MAZE_HORIZONTAL_MARGIN_PX}px;
  padding-right: ${MAZE_HORIZONTAL_MARGIN_PX}px;
`

const MazeArea = styled.div<{ $width: number }>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$width}px;
  background-color: #ffffff;
`

const ElementContainer = styled.div<{ $size: number; $xAbsolute: number; $yAbsolute: number }>`
  position: absolute;
  top: ${(props) => props.$yAbsolute}px;
  left: ${(props) => props.$xAbsolute}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`

const CellsContainer = styled.div<{ $cellWidth: number }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(${MAZE_SIZE}, 1fr);
  grid-template-rows: repeat(${MAZE_SIZE}, 1fr);
  width: ${(props) => props.$cellWidth * MAZE_SIZE};
  height: ${(props) => props.$cellWidth * MAZE_SIZE};
  border: 1px solid lightgrey;
`
