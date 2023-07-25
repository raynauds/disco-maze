import { useEffect } from "react"

import { HomeScreen } from "./components/screens/HomeScreen"
import { LoadingScreen } from "./components/screens/LoadingScreen"
import { useResponsive } from "./stores/dimensions.store"
import { useGame, useSetGameState } from "./stores/game.store"

function App() {
  const game = useGame()
  const setGame = useSetGameState()
  useResponsive()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame, players, yourPlayerId }) => {
        setGame({ game: newGame, players, yourPlayerId })
      },
    })
  }, [setGame])

  if (!game?.isLoaded) {
    return <LoadingScreen />
  }

  return <HomeScreen />
}

export default App
