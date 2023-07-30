// WARNING!: All Rune logic must be self-contained, no imports allowed
import type { GameOverOptions, RuneClient } from "rune-games-sdk/multiplayer"

/*********************************************************************************************************************
 * TYPES
 *********************************************************************************************************************/
export const directions = ["top", "right", "bottom", "left"] as const

export type Direction = (typeof directions)[number]

export type PlayerData = {
  avatarIndex: number // the avatarIndex of the players (1, 2, 3, or 4)
  position: Position
  moves: MoveName[]
  hasFoundDoor: boolean
}

export type Cell = {
  x: number
  y: number
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}

export type Position = {
  x: number
  y: number
}

// refrence: @Bustamovebook - https://www.youtube.com/playlist?list=PLA86FECA82B39229C
// "the-bus-stop", // [INCLUDES MULTIPLE MOVES] line dance go backward, forward, to the right, to the left, move feet on place, then rotate 90° and repeat
// "the-hustle", // [INCLUDES MULTIPLE MOVES]
// "the-travolta-side", // legs slightly bent to the right, torso and pointing to the right, left hand on the hip, hip retroversion/anteversion while looking around
// ??, // cf. https://youtu.be/HS6JX-B1Rpw?t=270 4:30 - rotate right arm to the bottom and to the top passing by the front while performing small forward jumps every 2 steps while arm is to the top
const moves = [
  "front-and-back", // move forward in 3 steps, clap, move backward in 3 steps, clap
  "the-turn-around", // move to the right while turning around 360° in 3 steps, clap, same thing to the left
  "roll-the-wrists", // roll the wrists, roll the wrists, roll the wrists, roll the wrists
  "the-bump", // jump arms in the air, bump booty against the booty of a partner, jump again, bump on the other side - 2 players must be on adjacent cells to perform this move
  "the-travolta", // point to the top rigt, left, right, touch left foot with right hand, repeat
  "the-chicken", // move arms like a chicken, move knees in and out
] as const

export type MoveName = (typeof moves)[number]

export type MovePerformance = {
  id: MoveName
  isPerformed: boolean
}

export type MovePerformedType = "no-effect" | "bouncer-pleased" | "bouncer-not-impressed"

export type LastDanceMovePerformed = {
  moveName: MoveName
  performancePlayerId: string
  performanceTimeSeconds: number
  type: MovePerformedType
}

export type LastDanceMoveCollected = {
  moveName: MoveName
  collectingPlayerId: string
}

export type LevelData = {
  level: number
  maze: Cell[][]
  bouncer: {
    position: Position
    movesRequired: MovePerformance[]
    isFound: boolean
    isSatisfiedWithYourMoves: boolean
  }
  door: {
    position: Position
  }
  move: {
    id: MoveName
    position: Position
    isCollected: boolean
  }
  startingPlayersPosition: Position
}

export type GameState = {
  isLoaded: boolean
  players: {
    [key: string]: PlayerData
  }
  levels: LevelData[]
  currentLevelIndex: number
  lastDanceMovePerformed: LastDanceMovePerformed | null
  lastDanceMoveCollected: LastDanceMoveCollected | null
}

type GameActions = {
  move: (params: { direction: Direction }) => void
  performMove: (params: { move: MoveName }) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

/*********************************************************************************************************************
 * DATA
 *********************************************************************************************************************/
export const MAZE_SIZE = 3

export const MAX_LEVEL = 8

export const MAX_GAME_TIME_SECONDS = 5 * 60 * 100 // TODO!: balance
export const EXTRA_SECOND_BONUS = 1

export const DELAY_BETWEEN_MOVES_MS = 150
export const DELAY_BETWEEN_DANCES_MS = 2000

export const MOVE_INVENTORY_SIZE = {
  ONE_PLAYER: 4,
  TWO_PLAYERS: 3,
  THREE_PLAYERS: 2,
  FOUR_PLAYERS: 2,
}

export const MAX_MOVE_INVENTORY_SIZE = MOVE_INVENTORY_SIZE.ONE_PLAYER

export const MAX_AVAILABLE_MOVES_COUNT = {
  ONE_PLAYER: MOVE_INVENTORY_SIZE.ONE_PLAYER * 1,
  TWO_PLAYERS: MOVE_INVENTORY_SIZE.TWO_PLAYERS * 2,
  THREE_PLAYERS: MOVE_INVENTORY_SIZE.THREE_PLAYERS * 3,
  FOUR_PLAYERS: MOVE_INVENTORY_SIZE.FOUR_PLAYERS * 4,
}

export const emptyGameState: GameState = {
  isLoaded: false,
  players: {},
  levels: [],
  currentLevelIndex: 0,
  lastDanceMovePerformed: null,
  lastDanceMoveCollected: null,
}

/*********************************************************************************************************************
 * MISC UTILS
 *********************************************************************************************************************/
export const createArray = (length: number) => Array.from({ length }, (_, i) => i)

export const getRandomItemFromArray = <T>(array: readonly T[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const randomizeArray = <T>(array: T[]) => {
  const arrayCopy = [...array]
  const randomizedArray: T[] = []
  for (let i = 0; i < array.length; i++) {
    const randomItem = MUTATION_WARNING_extractRandomItemFromArray(arrayCopy)
    randomizedArray.push(randomItem)
  }
  return randomizedArray
}

export const MUTATION_WARNING_extractRandomItemFromArray = <T>(array: T[]) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array.splice(randomIndex, 1)[0]
}

export const arePositionsEqual = (position1: Position, position2: Position) => {
  return position1.x === position2.x && position1.y === position2.y
}

export const getMaxInventorySize = ({ numberOfPlayers }: { numberOfPlayers: number }) => {
  switch (numberOfPlayers) {
    case 1:
      return MOVE_INVENTORY_SIZE.ONE_PLAYER
    case 2:
      return MOVE_INVENTORY_SIZE.TWO_PLAYERS
    case 3:
      return MOVE_INVENTORY_SIZE.THREE_PLAYERS
    case 4:
      return MOVE_INVENTORY_SIZE.FOUR_PLAYERS
    default:
      return MOVE_INVENTORY_SIZE.ONE_PLAYER
  }
}

const getMaxAvailableMovesCount = ({ numberOfPlayers }: { numberOfPlayers: number }) => {
  switch (numberOfPlayers) {
    case 1:
      return MAX_AVAILABLE_MOVES_COUNT.ONE_PLAYER
    case 2:
      return MAX_AVAILABLE_MOVES_COUNT.TWO_PLAYERS
    case 3:
      return MAX_AVAILABLE_MOVES_COUNT.THREE_PLAYERS
    case 4:
      return MAX_AVAILABLE_MOVES_COUNT.FOUR_PLAYERS
    default:
      return MAX_AVAILABLE_MOVES_COUNT.ONE_PLAYER
  }
}

export const createPositionsBucket = () => {
  return createArray(MAZE_SIZE)
    .map((_, i) => {
      return createArray(MAZE_SIZE).map((_, j) => {
        return { x: j, y: i }
      })
    })
    .flat()
}

export const createPositionsBucketWithoutTakenPositions = ({ takenPositions }: { takenPositions: Position[] }) => {
  return createPositionsBucket().filter((position) => {
    const isPositionTaken = takenPositions.some((takenPosition) => arePositionsEqual(position, takenPosition))
    return !isPositionTaken
  })
}

/*********************************************************************************************************************
 * GAME FUNCTIONS
 *********************************************************************************************************************/
// Randomized depth-first search - Iterative implementation with stack (thanks @thecodingtrain)
const generateMaze = () => {
  const cells = createArray(MAZE_SIZE).map((_, y) => {
    return createArray(MAZE_SIZE).map((_, x) => {
      const cell: Cell = {
        x,
        y,
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
  const level = game.levels[game.currentLevelIndex]
  const isTakenByPlayer = Object.values(game.players).some((player) => {
    return player.position.x === position.x && player.position.y === position.y
  })
  const isTakenByDoor = arePositionsEqual(level.door.position, position)
  const isTakenByBouncer = arePositionsEqual(level.bouncer.position, position)
  const isTakenByMove = arePositionsEqual(level.move.position, position)
  return isTakenByPlayer || isTakenByDoor || isTakenByBouncer || isTakenByMove
}

const getRandomPosition = (game: GameState) => {
  let x = Math.floor(Math.random() * MAZE_SIZE)
  let y = Math.floor(Math.random() * MAZE_SIZE)
  let isPositionTaken = checkIfPositionIsTaken(game, { x, y })

  let iterations = 0
  const maxIterations = MAZE_SIZE * MAZE_SIZE
  while (isPositionTaken && iterations < maxIterations) {
    const isLastCell = x === MAZE_SIZE - 1 && y === MAZE_SIZE - 1
    if (isLastCell) {
      y = 0
      x = 0
    } else {
      y = x >= MAZE_SIZE - 1 ? y + 1 : y
      x = (x + 1) % MAZE_SIZE
    }
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

  const level = game.levels[game.currentLevelIndex]

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

  const isTargetPositionTakenByBouncer = arePositionsEqual(level.bouncer.position, targetPosition)
  if (isTargetPositionTakenByBouncer) {
    return false
  }

  const cell = level.maze[y][x]
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
    if (otherPlayer.hasFoundDoor) {
      return false
    }
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

export const getVisibleCells = ({ level, observerPosition }: { level: LevelData; observerPosition: Position }) => {
  const maze = level.maze
  const { x, y } = observerPosition
  const visibleCells: Array<Position> = [{ x, y }]

  for (let i = 1; i < MAZE_SIZE; i++) {
    if (y - i < 0) {
      break
    }
    const topCell = maze[y - i][x]
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
    const rightCell = maze[y][x + i]
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
    const bottomCell = maze[y + i][x]
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
    const leftCell = maze[y][x - i]
    if (!leftCell.right) {
      visibleCells.push({ x: x - i, y })
    } else {
      break
    }
  }

  return visibleCells
}

export const MUTATION_WARNING_extractPositionThatDoesNotSeeBouncerOrMove = ({
  level,
  positionsBucket,
}: {
  level: LevelData
  positionsBucket: Position[]
}) => {
  const { bouncer, move } = level
  let iterations = 0
  const maxIterations = 1000
  let randomPosition = MUTATION_WARNING_extractRandomItemFromArray(positionsBucket)

  while (iterations < maxIterations) {
    iterations = iterations + 1
    const visibleCells = getVisibleCells({
      level,
      observerPosition: randomPosition,
    })
    const isBouncerVisible = visibleCells.some((cell) => {
      return !!bouncer && arePositionsEqual(cell, bouncer.position)
    })
    const isMoveVisible = visibleCells.some((cell) => {
      return !!move && arePositionsEqual(cell, move.position)
    })
    if (isBouncerVisible || isMoveVisible) {
      randomPosition = MUTATION_WARNING_extractRandomItemFromArray(positionsBucket)
      continue
    }
  }

  return randomPosition
}

export const checkIfCanPerformMove = ({
  player,
  move,
  lastDanceMovePerformed,
}: {
  player: PlayerData
  move: MoveName
  lastDanceMovePerformed: LastDanceMovePerformed | null
}) => {
  const canPerformMove = player.moves.includes(move)
  if (!canPerformMove) {
    return false
  }

  const currentTime = Rune.gameTimeInSeconds()
  const hasDelayPassed =
    !lastDanceMovePerformed ||
    currentTime - lastDanceMovePerformed.performanceTimeSeconds >= DELAY_BETWEEN_DANCES_MS / 1000
  if (!hasDelayPassed) {
    return false
  }

  return true
}

export const MUTATION_WARNING_generateMazeWithBouncerAndDoor = ({
  positionsBucket,
}: {
  positionsBucket: Position[]
}) => {
  const minBouncerCellWalls = 2
  let maze: Cell[][] = []
  let bouncerPosition: Position = { x: 0, y: 0 }
  let doorPosition: Position = { x: 0, y: 0 }
  const maxIterations = 1000
  let iterations = 0
  let isMazeValid = false

  while (!isMazeValid && iterations < maxIterations) {
    iterations = iterations + 1

    maze = generateMaze()

    const positionsWith3WallsInBucket = maze
      .map((row) => {
        return row.filter((cell) => {
          const isCellInBucket = positionsBucket.some((position) =>
            arePositionsEqual(position, {
              x: cell.x,
              y: cell.y,
            }),
          )
          if (!isCellInBucket) {
            return false
          }
          return directions.filter((direction) => cell[direction] === true).length === 3
        })
      })
      .flat()

    const doorCell = MUTATION_WARNING_extractRandomItemFromArray(positionsWith3WallsInBucket)
    if (!doorCell) {
      continue
    }

    doorPosition = { x: doorCell.x, y: doorCell.y }
    const doorDirectionWithoutWall = directions.find((direction) => !doorCell[direction])
    bouncerPosition = {
      x: doorPosition.x + (doorDirectionWithoutWall === "left" ? -1 : doorDirectionWithoutWall === "right" ? 1 : 0),
      y: doorPosition.y + (doorDirectionWithoutWall === "top" ? -1 : doorDirectionWithoutWall === "bottom" ? 1 : 0),
    }

    const bouncerCell = maze[bouncerPosition.y][bouncerPosition.x]
    const bouncerCellWalls = directions.filter((direction) => bouncerCell[direction] === true)
    if (bouncerCellWalls.length < minBouncerCellWalls) {
      continue
    }

    const doorPositionIndex = positionsBucket.findIndex((position) => {
      return arePositionsEqual(position, doorPosition)
    })
    positionsBucket.splice(doorPositionIndex, 1)

    const bouncerPositionIndex = positionsBucket.findIndex((position) => {
      return arePositionsEqual(position, bouncerPosition)
    })
    positionsBucket.splice(bouncerPositionIndex, 1)

    isMazeValid = true
  }

  return { maze, bouncerPosition, doorPosition }
}

export const MUTATION_WARNING_generateBouncerDoorAndMove = ({
  positionsBucket,
  bouncerPosition,
  doorPosition,
  possibleNewMoves,
  alreadyFoundMoves,
  numberOfMoves,
}: {
  positionsBucket: Position[]
  bouncerPosition: Position
  doorPosition: Position
  possibleNewMoves: MoveName[]
  alreadyFoundMoves: MoveName[]
  numberOfMoves: number
}) => {
  const newMoveId = getRandomItemFromArray(possibleNewMoves)
  const movePosition = MUTATION_WARNING_extractRandomItemFromArray(positionsBucket)
  const movesAvailableForPerformance = Array.from(new Set([newMoveId, ...alreadyFoundMoves]))

  let movesRequired: MovePerformance[] = createArray(numberOfMoves).map(() => {
    return { id: getRandomItemFromArray(movesAvailableForPerformance), isPerformed: false }
  })
  const movesRequiredIncludesNewMove = movesRequired.some((move) => move.id === newMoveId)
  if (!movesRequiredIncludesNewMove) {
    movesRequired.pop()
    movesRequired.push({ id: newMoveId, isPerformed: false })
  }
  movesRequired = randomizeArray(movesRequired)

  const bouncer: LevelData["bouncer"] = {
    position: bouncerPosition,
    movesRequired: movesRequired,
    isFound: false,
    isSatisfiedWithYourMoves: false,
  }

  const door: LevelData["door"] = {
    position: doorPosition,
  }

  const move: LevelData["move"] = {
    id: newMoveId,
    position: movePosition,
    isCollected: false,
  }

  return { bouncer, door, move }
}

export const goToNextLevel = (game: GameState) => {
  for (const playerId of Object.keys(game.players)) {
    const player = game.players[playerId]
    player.hasFoundDoor = false
  }

  const nextLevelIndex = game.currentLevelIndex + 1
  game.currentLevelIndex = nextLevelIndex
}

const getGameOverPlayers = ({
  players,
  score,
}: {
  players: GameState["players"]
  score: GameOverOptions["players"][string]
}) => {
  return Object.fromEntries(
    Object.keys(players).map((playerId) => {
      return [playerId, score] as const
    }),
  )
}

const getMovePerformedType = ({
  move,
  player,
  bouncer,
}: {
  move: MoveName
  player: PlayerData
  bouncer: LevelData["bouncer"]
}): MovePerformedType => {
  const distanceToBouncer =
    Math.abs(player.position.x - bouncer.position.x) + Math.abs(player.position.y - bouncer.position.y)
  const isNextToBouncer = distanceToBouncer <= 1

  if (!isNextToBouncer) {
    return "no-effect"
  }

  const nextMoveRequired = bouncer.movesRequired.find((moveRequired) => {
    return !moveRequired.isPerformed
  })
  if (!nextMoveRequired || nextMoveRequired.id !== move) {
    return "bouncer-not-impressed"
  }

  return "bouncer-pleased"
}

/*********************************************************************************************************************
 * RUNE LOGIC
 *********************************************************************************************************************/
Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (allPlayerIds): GameState => {
    const players: {
      [key: string]: PlayerData
    } = {}

    const maxMovesCount = getMaxAvailableMovesCount({ numberOfPlayers: allPlayerIds.length })
    const possibleNewMoves = randomizeArray([...moves]).filter((_, i) => i < maxMovesCount)
    let lastMoveSelected: MoveName | undefined
    let alreadyFoundMoves: MoveName[] = []

    const levels: LevelData[] = []
    let startingPlayersPosition: Position = {
      x: Math.floor(Math.random() * MAZE_SIZE),
      y: Math.floor(Math.random() * MAZE_SIZE),
    }

    for (let levelIndex = 0; levelIndex < MAX_LEVEL; levelIndex++) {
      const positionsBucket = createPositionsBucket()
      const playersPositionOrNeighbors: Position[] = [
        startingPlayersPosition,
        { x: startingPlayersPosition.x - 1, y: startingPlayersPosition.y },
        { x: startingPlayersPosition.x + 1, y: startingPlayersPosition.y },
        { x: startingPlayersPosition.x, y: startingPlayersPosition.y - 1 },
        { x: startingPlayersPosition.x, y: startingPlayersPosition.y + 1 },
      ]
      const availablePositionsBucket = positionsBucket.filter((position) => {
        const isPlayersPositionOrNeighbor = playersPositionOrNeighbors.some((item) => arePositionsEqual(position, item))
        return !isPlayersPositionOrNeighbor
      })

      const { maze, bouncerPosition, doorPosition } = MUTATION_WARNING_generateMazeWithBouncerAndDoor({
        positionsBucket: availablePositionsBucket,
      })

      const { bouncer, door, move } = MUTATION_WARNING_generateBouncerDoorAndMove({
        positionsBucket: availablePositionsBucket,
        bouncerPosition,
        doorPosition,
        possibleNewMoves: possibleNewMoves.filter((move) => move !== lastMoveSelected),
        alreadyFoundMoves,
        numberOfMoves: levelIndex + 1,
      })

      alreadyFoundMoves = Array.from(new Set([...alreadyFoundMoves, move.id]))
      lastMoveSelected = move.id

      levels.push({
        level: levelIndex + 1,
        maze,
        bouncer,
        door,
        move,
        startingPlayersPosition,
      })

      startingPlayersPosition = door.position
    }

    const avatarIndicesBucket = [0, 1, 2, 3]
    for (const playerId of allPlayerIds) {
      players[playerId] = {
        avatarIndex: MUTATION_WARNING_extractRandomItemFromArray(avatarIndicesBucket),
        position: levels[0]?.startingPlayersPosition || { x: 0, y: 0 },
        moves: [],
        hasFoundDoor: false,
      }
    }

    const game: GameState = {
      isLoaded: true,
      players,
      levels,
      currentLevelIndex: 0,
      lastDanceMovePerformed: null,
      lastDanceMoveCollected: null,
    }

    return game
  },
  actions: {
    move: ({ direction }, { game, playerId }) => {
      const player = game.players[playerId]
      if (!player || player.hasFoundDoor) {
        throw Rune.invalidAction()
      }

      const canMove = checkIfCanMove({ game, playerId, direction })
      if (!canMove) {
        throw Rune.invalidAction()
      }

      switch (direction) {
        case "top":
          player.position.y -= 1
          break
        case "bottom":
          player.position.y += 1
          break
        case "left":
          player.position.x -= 1
          break
        case "right":
          player.position.x += 1
      }

      const currentLevel = game.levels[game.currentLevelIndex]
      const { move, bouncer, door } = currentLevel

      const hasFoundMove =
        !!move &&
        !move.isCollected &&
        arePositionsEqual(player.position, move.position) &&
        !player.moves.includes(move.id)
      const canCollectAnotherMove =
        player.moves.length < getMaxInventorySize({ numberOfPlayers: Object.keys(game.players).length })
      if (move && hasFoundMove && canCollectAnotherMove) {
        move.isCollected = true
        game.lastDanceMoveCollected = { moveName: move.id, collectingPlayerId: playerId }
        player.moves.push(move.id)
      }

      if (!!bouncer && !bouncer.isFound) {
        const visibleCells = getVisibleCells({ level: currentLevel, observerPosition: player.position })
        const playerSeesBouncer = visibleCells.some((cell) => {
          return !!bouncer && arePositionsEqual(cell, bouncer.position)
        })
        if (playerSeesBouncer) {
          bouncer.isFound = true
        }
      }

      const hasFoundDoor = !!door && arePositionsEqual(player.position, door.position)
      if (hasFoundDoor) {
        player.hasFoundDoor = true
      }

      const hasEveryPLayerFoundDoor = Object.values(game.players).every((player) => {
        return player.hasFoundDoor
      })

      const isGameFinished =
        game.currentLevelIndex >= MAX_LEVEL - 1 &&
        Object.values(game.players).every((player) => {
          return player.hasFoundDoor
        })
      if (isGameFinished) {
        const allPlayersWin = getGameOverPlayers({ players: game.players, score: Rune.gameTimeInSeconds() })
        Rune.gameOver({ players: allPlayersWin })
      } else if (hasEveryPLayerFoundDoor) {
        goToNextLevel(game)
      }
    },
    performMove: ({ move }, { game, playerId }) => {
      const player = game.players[playerId]
      if (!player) {
        throw Rune.invalidAction()
      }
      const canPerformMove = checkIfCanPerformMove({
        player,
        move,
        lastDanceMovePerformed: game.lastDanceMovePerformed,
      })
      if (!canPerformMove) {
        throw Rune.invalidAction()
      }

      const { bouncer } = game.levels[game.currentLevelIndex]

      const movePerformedType = getMovePerformedType({
        move,
        player,
        bouncer,
      })

      const nextMoveRequired = bouncer.movesRequired.find((moveRequired) => {
        return !moveRequired.isPerformed
      })

      if (movePerformedType === "bouncer-pleased" && nextMoveRequired) {
        nextMoveRequired.isPerformed = true
      }

      game.lastDanceMovePerformed = {
        moveName: move,
        performancePlayerId: playerId,
        performanceTimeSeconds: Rune.gameTimeInSeconds(),
        type: movePerformedType,
      }

      if (movePerformedType !== "bouncer-pleased") {
        return
      }

      const areAllMovesPerformed = bouncer.movesRequired.every((moveRequired) => {
        return moveRequired.isPerformed
      })
      if (areAllMovesPerformed) {
        bouncer.isSatisfiedWithYourMoves = true
        bouncer.position = { x: -1, y: -1 }
      }
    },
  },
  events: {
    playerJoined: (playerId, { game }) => {
      const possibleAvatarIndices = [0, 1, 2, 3]
      for (const playerId of Object.keys(game.players)) {
        const avatarIndex = game.players[playerId].avatarIndex
        possibleAvatarIndices.splice(possibleAvatarIndices.indexOf(avatarIndex), 1)
      }
      game.players[playerId] = {
        avatarIndex: possibleAvatarIndices[Math.floor(Math.random() * possibleAvatarIndices.length)],
        position: getRandomPosition(game),
        moves: [],
        hasFoundDoor: false,
      }
    },
    playerLeft: (playerId, { game }) => {
      delete game.players[playerId]
    },
  },
  update: ({ game }) => {
    const gameTimeInSeconds = Rune.gameTimeInSeconds()
    if (gameTimeInSeconds > MAX_GAME_TIME_SECONDS + EXTRA_SECOND_BONUS) {
      const allPlayersLose = getGameOverPlayers({ players: game.players, score: game.currentLevelIndex })
      Rune.gameOver({ players: allPlayersLose })
    }
  },
})
