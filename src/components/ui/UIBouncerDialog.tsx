import { styled } from "styled-components"
import { MovePerformance } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { UIMove } from "./UIMove"

type UIBouncerDialogProps = {
  moves?: MovePerformance[]
}

export const UIBouncerDialog = ({ moves }: UIBouncerDialogProps) => {
  const { availableWidth } = useDimensions()

  if (!moves) {
    return <Root $availableWidth={availableWidth} $numberOfItems={0}></Root>
  }

  return (
    <Root $availableWidth={availableWidth} $numberOfItems={moves.length}>
      {moves.map((move, index) => {
        return (
          <MoveContainer key={`${move.id}-${index}`} $availableWidth={availableWidth}>
            <UIMove id={move.id} size="small" isPerformed={move.isPerformed} />
          </MoveContainer>
        )
      })}
    </Root>
  )
}

const rootPaddingFraction = 0.01
const moveContainerPaddingFraction = 0.01
const minHeightFraction =
  theme.availableWidthFraction.small + 2 * rootPaddingFraction + 2 * moveContainerPaddingFraction
const Root = styled.div<{ $availableWidth: number; $numberOfItems: number }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(${(props) => (props.$numberOfItems > 4 ? 2 : 1)}, 1fr);
  width: ${(props) => props.$availableWidth * 0.4}px;
  min-height: ${(props) => props.$availableWidth * minHeightFraction}px;
  background-color: #f0f0f0;
  padding: ${(props) => props.$availableWidth * rootPaddingFraction}px;
  border-radius: ${(props) => props.$availableWidth * 0.015}px;
`

const MoveContainer = styled.div<{ $availableWidth: number }>`
  padding: ${(props) => props.$availableWidth * moveContainerPaddingFraction}px;
`
