import { useEffect } from "react"

import { HomeScreen } from "./components/screens/HomeScreen"
import { LoadingScreen } from "./components/screens/LoadingScreen"
import { useResponsive } from "./stores/dimensions.store"
import { useGame, useSetGameState } from "./stores/game.store"
import { ModalProvider } from "./modals/modal.provider"
import { useOnMovePerformed } from "./hooks/useOnMovePerformed"

function App() {
  const game = useGame()
  const setGame = useSetGameState()
  useResponsive()
  useOnMovePerformed()

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

  return (
    <ModalProvider>
      <HomeScreen />
    </ModalProvider>
  )
}

export default App
