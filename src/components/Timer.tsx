import { useEffect, useState } from "react"
import { styled } from "styled-components"
import { images } from "../data/images"
import { MAX_GAME_TIME_SECONDS, MAX_LEVEL, createArray } from "../rune/logic"
import { useDimensions } from "../stores/dimensions.store"
import { useGame } from "../stores/game.store"
import { theme } from "../theme/theme"

export const Timer = () => {
  const { availableWidth, availableSpaceAroundMaze } = useDimensions()
  const game = useGame()

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
  const formatedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds} ⌛`

  return (
    <Root $availableWidth={availableWidth}>
      <LevelIndicatorsContainer>
        {createArray(MAX_LEVEL).map((_, index) => {
          const src =
            game.currentLevelIndex > index
              ? images.radioFilledGreen
              : game.currentLevelIndex === index
              ? images.radioFilledGrey
              : images.radioEmpty
          return <LevelIndicator key={index} src={src} $availableSpace={availableSpaceAroundMaze} />
        })}
      </LevelIndicatorsContainer>

      <TimerText $availableSpace={availableSpaceAroundMaze}>{formatedTime}</TimerText>
    </Root>
  )
}

const Root = styled.div<{ $availableWidth: number }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: ${(props) => props.$availableWidth * 0.03}px;
  padding-right: ${(props) => props.$availableWidth * 0.03}px;
  border: 2px solid ${theme.palette.border.light};
  border-radius: ${(props) => props.$availableWidth * 0.015}px;
  background-color: ${theme.palette.background.light};
`

const LevelIndicatorsContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  align-items: center;
`

const LevelIndicator = styled.img<{ $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * 0.07}px;
  height: ${(props) => props.$availableSpace * 0.07}px;
  margin-right: ${(props) => props.$availableSpace * 0.01}px;
`

const TimerText = styled.p<{ $availableSpace: number }>`
  font-size: ${(props) => props.$availableSpace * 0.07}px;
`
