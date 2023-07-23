import { styled } from "styled-components"
import { GameControls } from "../GameControls"
import { GameInformation } from "../GameInformation"
import { Maze } from "../Maze"

export const HomeScreen = () => {
  return (
    <Root>
      <SectionContainer>
        <GameInformation />
      </SectionContainer>
      <SectionContainer>
        <Maze />
      </SectionContainer>
      <SectionContainer>
        <GameControls />
      </SectionContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const SectionContainer = styled.div`
  width: 100%;
`
