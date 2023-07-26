import { styled } from "styled-components"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { GameControls } from "../GameControls"
import { GameInformation } from "../GameInformation"
import { Maze } from "../Maze"
import { MovesInventory } from "../MovesInventory"

export const HomeScreen = () => {
  const { availableWidth } = useDimensions()

  return (
    <Root>
      <AspectRatioContainer $width={availableWidth}>
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
      </AspectRatioContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const AspectRatioContainer = styled.div<{ $width: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: ${(props) => props.$width}px;
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
