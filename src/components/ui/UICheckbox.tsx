import { styled } from "styled-components"

type UICheckboxProps = {
  isChecked: boolean
}

export const UICheckbox = ({ isChecked }: UICheckboxProps) => {
  return <Root>{isChecked ? "X" : ""}</Root>
}

const Root = styled.div`
  width: 24px;
  height: 24px;
  background-color: lightgray;
  border-radius: 20%;
`
