import { styled } from "styled-components"
import { theme } from "../../theme/theme"
import { GameControls } from "../GameControls"
import { GameInformation } from "../GameInformation"
import { Maze } from "../Maze"
import { MovesInventory } from "../ui/MovesInventory"

export const HomeScreen = () => {
  return (
    <Root>
      <TopSectionContainer>
        <GameInformation />
      </TopSectionContainer>
      <MiddleSectionContainer>
        <Maze />
      </MiddleSectionContainer>
      <BottomSectionContainer>
        <MovesInventory />
        <GameControls />
      </BottomSectionContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`

const TopSectionContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
`

const MiddleSectionContainer = styled.div`
  width: 100%;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
`

const BottomSectionContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
`
