import { useEffect, useState } from "react"

import { HomeScreen } from "./components/screens/HomeScreen"
import { GameState } from "./rune/logic"

function App() {
  const [game, setGame] = useState<GameState>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ newGame }) => {
        setGame(newGame)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return <HomeScreen />
}

export default App
