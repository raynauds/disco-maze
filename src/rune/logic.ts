import type { RuneClient } from "rune-games-sdk/multiplayer"
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
    for (const playerId of allPlayerIds) {
      players[playerId] = {
        order,
        position: {
          x: 0,
          y: 0,
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
        position: {
          x: 0,
          y: 0,
        },
      }
    },
    playerLeft: (playerId, { game }) => {
      delete game.players[playerId]
    },
  },
})
