import { styled } from "styled-components"
import { theme } from "../theme/theme"
import { UIBouncerAvatar } from "./ui/UIBouncerAvatar"
import { UIBouncerDialog } from "./ui/UIBouncerDialog"
import { UICheckbox } from "./ui/UICheckbox"
import { UIMove } from "./ui/UIMove"

type GameInformationProps = {}

export const GameInformation = ({}: GameInformationProps) => {
  return (
    <Root>
      <FindContainer>
        <FindMoveContainer>
          <CheckboxContainer>
            <UICheckbox />
          </CheckboxContainer>
          <UIMove size="medium" />
        </FindMoveContainer>
        <FindBouncerContainer>
          <CheckboxContainer>
            <UICheckbox />
          </CheckboxContainer>
          <UIBouncerAvatar />
        </FindBouncerContainer>
      </FindContainer>

      <BouncerContainerContainer>
        <BouncerContainer>
          <BouncerAvatarContainer>
            <UIBouncerAvatar />
          </BouncerAvatarContainer>
          <UIBouncerDialog />
        </BouncerContainer>
      </BouncerContainerContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  width: 100%;
  padding: ${theme.spacing(2)};
  border: 1px dashed grey;
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
