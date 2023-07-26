import { useMemo } from "react"
import { styled } from "styled-components"
import { MAZE_SIZE, getVisibleCells } from "../rune/logic"
import { MAZE_HORIZONTAL_MARGIN_PX, useDimensions } from "../stores/dimensions.store"
import { useGame, useYourPlayerId } from "../stores/game.store"
import { UIBouncer } from "./ui/UIBouncer"
import { UIDancer } from "./ui/UIDancer"
import { UIDoor } from "./ui/UIDoor"
import { UIMazeCell } from "./ui/UIMazeCell"

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

  return (
    <Root>
      <MazeArea $width={availableWidth}>
        {dancers.map((dancer) => {
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

        {game.bouncer ? (
          <ElementContainer
            $size={cellWidth}
            $xAbsolute={game.bouncer.position.x * cellWidth}
            $yAbsolute={game.bouncer.position.y * cellWidth}
          >
            <UIBouncer />
          </ElementContainer>
        ) : null}

        {game.door ? (
          <ElementContainer
            $size={cellWidth}
            $xAbsolute={game.door.position.x * cellWidth}
            $yAbsolute={game.door.position.y * cellWidth}
          >
            <UIDoor />
          </ElementContainer>
        ) : null}

        <CellsContainer>
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
  margin-left: ${MAZE_HORIZONTAL_MARGIN_PX}px;
  margin-right: ${MAZE_HORIZONTAL_MARGIN_PX}px;
`

const MazeArea = styled.div<{ $width: number }>`
  position: relative;
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$width}px;
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
