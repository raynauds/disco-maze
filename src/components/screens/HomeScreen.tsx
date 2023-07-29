import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { GameControls } from "../GameControls"
import { GameInformation } from "../GameInformation"
import { Maze } from "../Maze"
import { MovesInventory } from "../MovesInventory"
import { Timer } from "../Timer"
import { useOpenModal } from "../../modals/modal.store"

export const HomeScreen = () => {
  const { availableWidth } = useDimensions()
  const openModal = useOpenModal()

  return (
    <Root>
      <AspectRatioContainer $width={availableWidth}>
        <TopSectionContainer>
          <GameInformationContainer>
            <GameInformation />
          </GameInformationContainer>
          <Timer />
          <button
            onClick={() =>
              openModal({
                type: "dance-performed",
                props: {
                  moveName: "roll-the-wrists",
                  userName: "John Doe",
                },
              })
            }
          >
            open modal
          </button>
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
  background-image: url("${images.background}");
  background-size: cover;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
`

const GameInformationContainer = styled.div`
  width: 100%;
  margin-bottom: ${theme.spacing(2)};
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
