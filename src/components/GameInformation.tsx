import { styled } from "styled-components"
import { useCurrentLevel } from "../stores/game.store"
import { theme } from "../theme/theme"
import { UIBouncerAvatar } from "./ui/UIBouncerAvatar"
import { UIBouncerDialog } from "./ui/UIBouncerDialog"
import { UICheckbox } from "./ui/UICheckbox"
import { UIMove } from "./ui/UIMove"

export const GameInformation = () => {
  const level = useCurrentLevel()
  const { bouncer, move } = level
  const collectedMoveId = move.isCollected ? move.id : undefined
  const isBouncerFound = bouncer.isFound
  const movesDisplayedInDialog = isBouncerFound ? bouncer.movesRequired : undefined

  return (
    <Root>
      <FindContainer>
        <FindMoveContainer>
          <CheckboxContainer>
            <UICheckbox isChecked={!!collectedMoveId} />
          </CheckboxContainer>
          <UIMove id={collectedMoveId} size="medium" />
        </FindMoveContainer>
        <FindBouncerContainer>
          <CheckboxContainer>
            <UICheckbox isChecked={isBouncerFound} />
          </CheckboxContainer>
          <UIBouncerAvatar />
        </FindBouncerContainer>
      </FindContainer>

      <BouncerContainerContainer>
        <BouncerContainer>
          <BouncerAvatarContainer>
            <UIBouncerAvatar />
          </BouncerAvatarContainer>
          <UIBouncerDialog moves={movesDisplayedInDialog} />
        </BouncerContainer>
      </BouncerContainerContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: ${theme.spacing(2)};
  border: 1px dashed lightgrey;
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

const BouncerContainerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BouncerContainer = styled.div`
  display: flex;
  align-items: center;
`

const BouncerAvatarContainer = styled.div`
  margin-right: ${theme.spacing(1)};
`
