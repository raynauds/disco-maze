import { useEffect } from "react"

import { HomeScreen } from "./components/screens/HomeScreen"
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
    return <div>Loading...</div>
  }

  return <HomeScreen />
}

export default App
