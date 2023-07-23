import { styled } from "styled-components"

type UIBouncerDialogProps = Record<string, never>

export const UIBouncerDialog = ({}: UIBouncerDialogProps) => {
  return <Root></Root>
}

const Root = styled.div`
  width: 160px;
  height: 40px;
  background-color: lightgray;
  border-radius: 4px;
`
