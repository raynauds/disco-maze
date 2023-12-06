import { useEffect } from "react"

import { HomeScreen } from "./components/screens/HomeScreen"
import { LoadingScreen } from "./components/screens/LoadingScreen"
import { useDanceMoveHandler } from "./hooks/useDanceMoveHandler"
import { ModalProvider } from "./modals/modal.provider"
import { useResponsive } from "./stores/dimensions.store"
import { useGame, useSetGameState } from "./stores/game.store"
import { useBackgroundMusic } from "./stores/sounds.store"

function App() {
  const game = useGame()
  const setGame = useSetGameState()
  useResponsive()
  useDanceMoveHandler()
  useBackgroundMusic()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame({ game, players, yourPlayerId })
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
