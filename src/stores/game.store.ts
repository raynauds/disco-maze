import { useEffect, useMemo, useState } from "react"
import { Players } from "rune-games-sdk/multiplayer"
import { create } from "zustand"
import { GameState, emptyGameState } from "../rune/logic"

export const LEVEL_TRANSITION_MS = 2000

type GameStoreState = {
  game: GameState
  players: Players
  yourPlayerId: string | undefined
  setGame: (options: { game: GameState; players: Players; yourPlayerId: string | undefined }) => void
}

const useGameStore = create<GameStoreState>()((set) => ({
  game: emptyGameState,
  players: {},
  yourPlayerId: "",
  setGame: ({ game, players, yourPlayerId }) => set(() => ({ game, players, yourPlayerId })),
}))

export const useGame = () => useGameStore((state) => state.game)
export const usePlayers = () => useGameStore((state) => state.players)
export const useYourPlayerId = () => useGameStore((state) => state.yourPlayerId)
export const useLastDanceMovePerformed = () => useGameStore((state) => state.game.lastDanceMovePerformed)
export const useLastDanceMoveCollected = () => useGameStore((state) => state.game.lastDanceMoveCollected)
export const useSetGameState = () => useGameStore((state) => state.setGame)

export const useCurrentLevel = () => {
  const game = useGame()

  const currentLevel = useMemo(() => {
    return game.levels[game.currentLevelIndex]
  }, [game.currentLevelIndex, game.levels])

  const [previousLevel, setPreviousLevel] = useState(currentLevel)

  const isChangingLevel = useMemo(() => {
    return currentLevel.level !== previousLevel.level
  }, [currentLevel.level, previousLevel.level])

  const level = useMemo(() => {
    return isChangingLevel ? previousLevel : currentLevel
  }, [currentLevel, isChangingLevel, previousLevel])

  useEffect(() => {
    if (level.level === currentLevel.level) {
      return
    }
    const timeout = setTimeout(() => {
      setPreviousLevel(currentLevel)
    }, LEVEL_TRANSITION_MS / 2)

    return () => clearTimeout(timeout)
  }, [level, currentLevel, isChangingLevel])

  return {
    level,
    isChangingLevel,
  }
}
