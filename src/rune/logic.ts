// WARNING!: All Rune logic must be self-contained, no imports allowed
import type { RuneClient } from "rune-games-sdk/multiplayer"

/**
 * TYPES
 */
export const directions = ["top", "right", "bottom", "left"] as const

export type Direction = (typeof directions)[number]

export type PlayerData = {
  order: number // the order of the players (1, 2, 3, or 4)
  position: Position
}

export type Cell = {
  position: Position
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

export type Position = {
  x: number
  y: number
}

const moves = ["the-hustle"] as const // TODO!: add more moves & display move in maze

export type Move = (typeof moves)[number]

export type GameState = {
  isLoaded: boolean
  maze: Cell[][]
  players: {
    [key: string]: PlayerData
  }
  bouncer?: {
    position: Position
    movesRequired: Move[]
  }
  door?: {
    position: Position
  }
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
  maze: [],
  players: {},
  bouncer: {
    position: {
      x: 0,
      y: 0,
    },
    movesRequired: [],
  },
}

/**
 * MISC UTILS
 */
export const createArray = (length: number) => Array.from({ length }, (_, i) => i)

export const MUTATION_WARNING_extractRandomItemFromArray = <T>(array: T[]) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array.splice(randomIndex, 1)[0]
}

export const arePositionsEqual = (position1: Position, position2: Position) => {
  return position1.x === position2.x && position1.y === position2.y
}

/**
 * GAME FUNCTIONS
 */
// Randomized depth-first search - Iterative implementation with stack (thanks @thecodingtrain)
const generateMaze = () => {
  const cells = createArray(MAZE_SIZE).map((_, y) => {
    return createArray(MAZE_SIZE).map((_, x) => {
      const cell: Cell = {
        position: {
          x,
          y,
        },
        top: true,
        right: true,
        bottom: true,
        left: true,
      }
      return cell
    })
  })

  const getCellKey = ({ x, y }: Position) => `${x},${y}`
  const visitedCells: { [key: string]: boolean } = {}
  const stack: Position[] = []
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

    const neighbors: Position[] = [
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

const checkIfPositionIsTaken = (game: GameState, position: Position) => {
  return Object.values(game.players).some((player) => {
    return player.position.x === position.x && player.position.y === position.y
  })
}

const getRandomPosition = (game: GameState) => {
  let x = Math.floor(Math.random() * MAZE_SIZE)
  let y = Math.floor(Math.random() * MAZE_SIZE)
  let isPositionTaken = checkIfPositionIsTaken(game, { x, y })

  let iterations = 0
  const maxIterations = MAZE_SIZE * MAZE_SIZE
  while (isPositionTaken && iterations < maxIterations) {
    y = x >= MAZE_SIZE - 1 ? y + 1 : y
    x = (x + 1) % MAZE_SIZE
    isPositionTaken = checkIfPositionIsTaken(game, { x, y })
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
  const targetPosition: Position = {
    x: direction === "left" ? x - 1 : direction === "right" ? x + 1 : x,
    y: direction === "top" ? y - 1 : direction === "bottom" ? y + 1 : y,
  }

  const isOutOfBounds =
    targetPosition.x < 0 || targetPosition.x >= MAZE_SIZE || targetPosition.y < 0 || targetPosition.y >= MAZE_SIZE
  if (isOutOfBounds) {
    return false
  }

  const isTargetPositionTakenByBouncer = game.bouncer && arePositionsEqual(game.bouncer.position, targetPosition)
  if (isTargetPositionTakenByBouncer) {
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

export const getVisibleCells = ({ game, observerPosition }: { game: GameState; observerPosition: Position }) => {
  const { x, y } = observerPosition
  const visibleCells: Array<Position> = [{ x, y }]

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

    const maze = generateMaze()

    const positionsBucket = createArray(MAZE_SIZE)
      .map((_, i) => {
        return createArray(MAZE_SIZE).map((_, j) => {
          return { x: j, y: i }
        })
      })
      .flat()

    const positionsWith3Walls = maze
      .map((row) => {
        return row.filter((cell) => {
          return directions.filter((direction) => cell[direction] === true).length === 3
        })
      })
      .flat()

    const doorCell = MUTATION_WARNING_extractRandomItemFromArray(positionsWith3Walls)
    const doorPosition = doorCell.position
    const doorDirectionWithoutWall = directions.find((direction) => !doorCell[direction])
    const bouncerPosition: Position = {
      x: doorPosition.x + (doorDirectionWithoutWall === "left" ? -1 : doorDirectionWithoutWall === "right" ? 1 : 0),
      y: doorPosition.y + (doorDirectionWithoutWall === "top" ? -1 : doorDirectionWithoutWall === "bottom" ? 1 : 0),
    }

    let order = 1
    for (const playerId of allPlayerIds) {
      const randomPosition = MUTATION_WARNING_extractRandomItemFromArray(positionsBucket)
      players[playerId] = {
        order,
        position: randomPosition,
      }
      order = order + 1
    }

    return {
      isLoaded: true,
      players,
      maze,
      bouncer: {
        position: bouncerPosition,
        movesRequired: [],
      },
      door: {
        position: doorPosition,
      },
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
