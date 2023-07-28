import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"

type UICheckboxProps = {
  isChecked: boolean
}

export const UICheckbox = ({ isChecked }: UICheckboxProps) => {
  const { availableSpaceAroundMaze } = useDimensions()

  return (
    <Root
      src={isChecked ? images.checkboxFilled : images.checkboxEmpty}
      $availableSpace={availableSpaceAroundMaze}
    ></Root>
  )
}

const Root = styled.img<{ $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * 0.07}px;
  height: ${(props) => props.$availableSpace * 0.07}px;
`
