import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { MAX_GAME_TIME_SECONDS } from "../rune/logic"
import { theme } from "../theme/theme"

export const Timer = () => {
  const [gameTimeInSeconds, setGameTimeInSeconds] = useState(0)

  useEffect(() => {
    const updateGameTime = () => {
      setGameTimeInSeconds(Rune.gameTimeInSeconds())
    }
    const interval = setInterval(updateGameTime, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const timeRemaining = Math.max(MAX_GAME_TIME_SECONDS - gameTimeInSeconds, 0)
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = Math.floor(timeRemaining % 60)
  const formatedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`

  return <Root>{formatedTime}</Root>
}
const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: ${theme.spacing(0.5)};
  border: 1px dashed lightgrey;
`
