import { styled } from "styled-components"
import { MovePerformance } from "../../rune/logic"
import { UIMove } from "./UIMove"

type UIBouncerDialogProps = {
  moves?: MovePerformance[]
}

export const UIBouncerDialog = ({ moves }: UIBouncerDialogProps) => {
  if (!moves) {
    return <Root></Root>
  }

  return (
    <Root>
      {moves.map((move, index) => {
        return <UIMove key={`${move.id}-${index}`} id={move.id} size="small" isPerformed={move.isPerformed} />
      })}
    </Root>
  )
}

const Root = styled.div`
  width: 160px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 4px;
`
