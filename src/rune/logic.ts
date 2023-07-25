import type { RuneClient } from "rune-games-sdk/multiplayer"
import { createArray } from "../utils.ts/array.utils"

/**
 * TYPES
 */
export type Direction = "top" | "right" | "bottom" | "left"

export type PlayerData = {
  order: number // the order of the players (1, 2, 3, or 4)
  position: {
    x: number
    y: number
  }
}

export type Cell = {
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

export type GameState = {
  isLoaded: boolean
  players: {
    [key: string]: PlayerData
  }
  maze: Cell[][]
}

type GameActions = {
  move: (params: { direction: Direction }) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

/**
 * DATA
 */
export const MAZE_SIZE = 9

export const emptyGameState: GameState = {
  isLoaded: false,
  players: {},
  maze: [],
}

/**
 * FUNCTIONS
 */
// Randomized depth-first search - Iterative implementation with stack (thanks @thecodingtrain)
const generateMaze = () => {
  const cells = createArray(MAZE_SIZE).map(() => {
    return createArray(MAZE_SIZE).map(() => {
      const cell: Cell = {
        top: true,
        right: true,
        bottom: true,
        left: true,
      }
      return cell
    })
  })

  const getCellKey = ({ x, y }: { x: number; y: number }) => `${x},${y}`
  const visitedCells: { [key: string]: boolean } = {}
  const stack: { x: number; y: number }[] = []
  const startingCell = {
    x: Math.floor(Math.random() * MAZE_SIZE),
    y: Math.floor(Math.random() * MAZE_SIZE),
  }
  stack.push(startingCell)
  visitedCells[getCellKey(startingCell)] = true

  const maxIterations = 100000
  let iterations = 0
  while (stack.length > 0 && iterations < maxIterations) {
    const cell = stack.pop()
    if (!cell) {
      break
    }

    visitedCells[getCellKey(cell)] = true

    const neighbors: { x: number; y: number }[] = [
      { x: cell.x, y: cell.y - 1 },
      { x: cell.x, y: cell.y + 1 },
      { x: cell.x - 1, y: cell.y },
      { x: cell.x + 1, y: cell.y },
    ]
    const unvisitedNeighbors = neighbors.filter((neighbor) => {
      return (
        neighbor.x >= 0 &&
        neighbor.x < MAZE_SIZE &&
        neighbor.y >= 0 &&
        neighbor.y < MAZE_SIZE &&
        !visitedCells[getCellKey(neighbor)]
      )
    })
    const randomNeighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
    if (!randomNeighbor) {
      continue
    }

    if (randomNeighbor.y < cell.y) {
      cells[cell.y][cell.x].top = false
      cells[randomNeighbor.y][randomNeighbor.x].bottom = false
    }
    if (randomNeighbor.y > cell.y) {
      cells[cell.y][cell.x].bottom = false
      cells[randomNeighbor.y][randomNeighbor.x].top = false
    }
    if (randomNeighbor.x < cell.x) {
      cells[cell.y][cell.x].left = false
      cells[randomNeighbor.y][randomNeighbor.x].right = false
    }
    if (randomNeighbor.x > cell.x) {
      cells[cell.y][cell.x].right = false
      cells[randomNeighbor.y][randomNeighbor.x].left = false
    }

    stack.push(cell)
    stack.push(randomNeighbor)
    visitedCells[getCellKey(randomNeighbor)] = true
    iterations = iterations + 1
  }

  return cells
}

const checkIfPositionIsTaken = (game: GameState, x: number, y: number) => {
  return Object.values(game.players).some((player) => {
    return player.position.x === x && player.position.y === y
  })
}

const getRandomPosition = (game: GameState) => {
  let x = Math.floor(Math.random() * MAZE_SIZE)
  let y = Math.floor(Math.random() * MAZE_SIZE)
  let isPositionTaken = checkIfPositionIsTaken(game, x, y)

  let iterations = 0
  const maxIterations = MAZE_SIZE * MAZE_SIZE
  while (isPositionTaken && iterations < maxIterations) {
    y = x >= MAZE_SIZE - 1 ? y + 1 : y
    x = (x + 1) % MAZE_SIZE
    isPositionTaken = checkIfPositionIsTaken(game, x, y)
    iterations = iterations + 1
  }

  return { x, y }
}

export const checkIfCanMove = ({
  game,
  playerId,
  direction,
}: {
  game: GameState
  playerId: string
  direction: Direction
}) => {
  const player = game.players[playerId]
  if (!player) {
    return false
  }

  const x = player.position.x
  const y = player.position.y
  const targetPosition = {
    x: direction === "left" ? x - 1 : direction === "right" ? x + 1 : x,
    y: direction === "top" ? y - 1 : direction === "bottom" ? y + 1 : y,
  }

  const isOutOfBounds =
    targetPosition.x < 0 || targetPosition.x >= MAZE_SIZE || targetPosition.y < 0 || targetPosition.y >= MAZE_SIZE
  if (isOutOfBounds) {
    return false
  }

  const cell = game.maze[y][x]
  if (!cell) {
    return false
  }
  switch (direction) {
    case "top":
      if (cell.top) {
        return false
      }
      break
    case "bottom":
      if (cell.bottom) {
        return false
      }
      break
    case "left":
      if (cell.left) {
        return false
      }
      break
    case "right":
      if (cell.right) {
        return false
      }
  }

  const otherPlayers = Object.keys(game.players).filter((otherPlayerId) => {
    const otherPlayer = game.players[otherPlayerId]
    return !!otherPlayer && playerId !== otherPlayerId
  })
  const isOtherPlayerOnTargetPosition = otherPlayers.some((otherPlayerId) => {
    const otherPlayer = game.players[otherPlayerId]
    return !!otherPlayer && otherPlayer.position.x === targetPosition.x && otherPlayer.position.y === targetPosition.y
  })
  if (isOtherPlayerOnTargetPosition) {
    return false
  }

  return true
}

export const getVisibleCells = ({
  game,
  observerPosition,
}: {
  game: GameState
  observerPosition: { x: number; y: number }
}) => {
  const { x, y } = observerPosition
  const visibleCells: Array<{ x: number; y: number }> = [{ x, y }]

  for (let i = 1; i < MAZE_SIZE; i++) {
    if (y - i < 0) {
      break
    }
    const topCell = game.maze[y - i][x]
    if (!topCell.bottom) {
      visibleCells.push({ x, y: y - i })
    } else {
      break
    }
  }
  for (let i = 1; i < MAZE_SIZE; i++) {
    if (x + i >= MAZE_SIZE) {
      break
    }
    const rightCell = game.maze[y][x + i]
    if (!rightCell.left) {
      visibleCells.push({ x: x + i, y })
    } else {
      break
    }
  }
  for (let i = 1; i < MAZE_SIZE; i++) {
    if (y + i >= MAZE_SIZE) {
      break
    }
    const bottomCell = game.maze[y + i][x]
    if (!bottomCell.top) {
      visibleCells.push({ x, y: y + i })
    } else {
      break
    }
  }
  for (let i = 1; i < MAZE_SIZE; i++) {
    if (x - i < 0) {
      break
    }
    const leftCell = game.maze[y][x - i]
    if (!leftCell.right) {
      visibleCells.push({ x: x - i, y })
    } else {
      break
    }
  }

  return visibleCells
}

/**
 * RUNE LOGIC
 */
Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    const players: {
      [key: string]: PlayerData
    } = {}

    let order = 1
    const positionsBucket = createArray(MAZE_SIZE).map((_, i) => i)
    for (const playerId of allPlayerIds) {
      const xIndex = Math.floor(Math.random() * positionsBucket.length)
      const x = positionsBucket.splice(xIndex, 1)[0]
      const yIndex = Math.floor(Math.random() * positionsBucket.length)
      const y = positionsBucket.splice(yIndex, 1)[0]
      players[playerId] = {
        order,
        position: {
          x,
          y,
        },
      }
      order = order + 1
    }

    return {
      isLoaded: true,
      players,
      maze: generateMaze(),
    }
  },
  actions: {
    move: ({ direction }, { game, playerId }) => {
      const player = game.players[playerId]
      if (!player) {
        throw Rune.invalidAction()
      }

      const canMove = checkIfCanMove({ game, playerId, direction })
      if (!canMove) {
        throw Rune.invalidAction()
      }

      switch (direction) {
        case "top":
          game.players[playerId].position.y -= 1
          break
        case "bottom":
          game.players[playerId].position.y += 1
          break
        case "left":
          game.players[playerId].position.x -= 1
          break
        case "right":
          game.players[playerId].position.x += 1
      }
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      const possibleOrders = [1, 2, 3, 4]
      for (const playerId of Object.keys(game.players)) {
        const order = game.players[playerId].order
        possibleOrders.splice(possibleOrders.indexOf(order), 1)
      }
      game.players[playerId] = {
        order: possibleOrders[0],
        position: getRandomPosition(game),
      }
    },
    playerLeft: (playerId, { game }) => {
      delete game.players[playerId]
    },
  },
})
