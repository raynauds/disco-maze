import { styled } from "styled-components"
import { useOpenModal } from "../modals/modal.store"
import { useDimensions } from "../stores/dimensions.store"
import { useCurrentLevel } from "../stores/game.store"
import { theme } from "../theme/theme"
import { UIBouncerAvatar } from "./ui/UIBouncerAvatar"
import { UIBouncerDialog } from "./ui/UIBouncerDialog"
import { UICheckbox } from "./ui/UICheckbox"
import { UIMove } from "./ui/UIMove"

export const GameInformation = () => {
  const { availableWidth, availableSpaceAroundMaze } = useDimensions()
  const openModal = useOpenModal()
  const { level } = useCurrentLevel()
  const { bouncer, move } = level
  const movesDisplayedInDialog = bouncer.isFound ? bouncer.movesRequired : undefined

  return (
    <Root $availableWidth={availableWidth}>
      <FindContainer>
        <FindMoveContainer>
          <CheckboxContainer>
            <UICheckbox isChecked={move.isCollected} />
          </CheckboxContainer>
          <UIMove id={move.id} size="small" />
        </FindMoveContainer>
        <FindBouncerContainer>
          <CheckboxContainer>
            <UICheckbox isChecked={bouncer.isFound} />
          </CheckboxContainer>
          <SmallBouncerAvatarContainer $availableSpace={availableSpaceAroundMaze}>
            <UIBouncerAvatar size="small" />
          </SmallBouncerAvatarContainer>
        </FindBouncerContainer>
      </FindContainer>

      <BouncerContainerContainer>
        <BouncerContainer>
          <BouncerAvatarContainer $availableSpace={availableSpaceAroundMaze}>
            <UIBouncerAvatar size="medium" />
          </BouncerAvatarContainer>
          <UIBouncerDialog moves={movesDisplayedInDialog} />
        </BouncerContainer>
      </BouncerContainerContainer>

      <InfoButton onClick={() => openModal({ type: "game-information" })} $availableWidth={availableWidth}>
        <InfoIconText $availableWidth={availableWidth}>?</InfoIconText>
      </InfoButton>
    </Root>
  )
}

const Root = styled.div<{ $availableWidth: number }>`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: ${theme.spacing(2)};
  border: 2px solid ${theme.palette.border.light};
  border-radius: ${(props) => props.$availableWidth * 0.03}px;
  background-color: ${theme.palette.background.light};
`

const FindContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FindMoveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing(1)};
`

const FindBouncerContainer = styled.div`
  display: flex;
  align-items: center;
`

const CheckboxContainer = styled.div`
  margin-right: ${theme.spacing(1.5)};
`

const SmallBouncerAvatarContainer = styled.div<{ $availableSpace: number }>`
  margin-bottom: ${(props) => props.$availableSpace * 0.01}px;
`

const BouncerContainerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BouncerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const BouncerAvatarContainer = styled.div<{ $availableSpace: number }>`
  top: ${(props) => props.$availableSpace * -0.07}px;
  right: ${(props) => props.$availableSpace * -0.07}px;
  margin-right: ${theme.spacing(1)};
  margin-bottom: ${(props) => props.$availableSpace * 0.02}px;
`

const InfoButton = styled.button<{ $availableWidth: number }>`
  position: absolute;
  top: ${(props) => props.$availableWidth * 0.02}px;
  right: ${(props) => props.$availableWidth * 0.02}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$availableWidth * 0.06}px;
  height: ${(props) => props.$availableWidth * 0.06}px;
  border: 2px solid ${theme.palette.border.main};
  border-radius: 50%;

  &:active {
    scale: 0.9;
  }
`

const InfoIconText = styled.div<{ $availableWidth: number }>`
  font-family: ${theme.typography.h2.font}; // TODO?: rename property because it's not specific to h2?
  font-size: ${(props) => props.$availableWidth * 0.04}px;
  color: ${theme.palette.border.main};
`
