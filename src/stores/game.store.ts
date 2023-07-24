import { Players } from "rune-games-sdk/multiplayer"
import { create } from "zustand"
import { GameState, emptyGameState } from "../rune/logic"

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
export const useSetGameState = () => useGameStore((state) => state.setGame)
