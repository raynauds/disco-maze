import type { RuneClient } from "rune-games-sdk/multiplayer"
import { createArray } from "../utils.ts/array.utils"
import { MAZE_SIZE } from "../utils.ts/misc.utils"

export type Direction = "top" | "bottom" | "left" | "right"

export type PlayerData = {
  order: number // the order of the players (1, 2, 3, or 4)
  position: {
    x: number
    y: number
  }
}

export type GameState = {
  isLoaded: boolean
  players: {
    [key: string]: PlayerData
  }
}

export const emptyGameState: GameState = {
  isLoaded: false,
  players: {},
}

type GameActions = {
  move: (params: { direction: Direction }) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

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
    }
  },
  actions: {
    move: ({ direction }, { game, playerId }) => {
      const x = game.players[playerId].position.x
      const y = game.players[playerId].position.y

      const isOutOfBounds =
        (direction === "top" && y <= 0) ||
        (direction === "bottom" && y >= MAZE_SIZE - 1) ||
        (direction === "left" && x <= 0) ||
        (direction === "right" && x >= MAZE_SIZE - 1)

      if (isOutOfBounds) {
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
