import { styled } from "styled-components"
import { Direction } from "../rune/logic"
import { UIControlButton } from "./ui/UIControlButton"

export const GameControls = () => {
  const move = (direction: Direction) => {
    // TODO!: check if move is valid before dispatching
    Rune.actions.move({ direction })
  }

  return (
    <Root>
      <UIControlButtonLeft onClick={() => move("left")} />
      <UIControlButtonRight onClick={() => move("right")} />
      <UIControlButtonTop onClick={() => move("top")} />
      <UIControlButtonBottom onClick={() => move("bottom")} />
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
