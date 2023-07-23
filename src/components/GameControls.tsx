import { styled } from "styled-components"
import { UIControlButton } from "./ui/UIControlButton"

type GameControlsProps = Record<string, never>

export const GameControls = ({}: GameControlsProps) => {
  return (
    <Root>
      <UIControlButtonLeft />
      <UIControlButtonRight />
      <UIControlButtonTop />
      <UIControlButtonBottom />
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`

const UIControlButtonLeft = styled(UIControlButton)`
  grid-column: 1;
  grid-row: 2;
`

const UIControlButtonRight = styled(UIControlButton)`
  grid-column: 3;
  grid-row: 2;
`

const UIControlButtonTop = styled(UIControlButton)`
  grid-column: 2;
  grid-row: 1;
`

const UIControlButtonBottom = styled(UIControlButton)`
  grid-column: 2;
  grid-row: 3;
`
