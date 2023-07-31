import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { UIImage } from "./UIImage"

type UICheckboxProps = {
  isChecked: boolean
}

export const UICheckbox = ({ isChecked }: UICheckboxProps) => {
  const { availableSpaceAroundMaze } = useDimensions()

  return (
    <Root
      src={isChecked ? images.checkboxFilled : images.checkboxEmpty}
      alt={isChecked ? "checkbox filled" : "checkbox empty"}
      $availableSpace={availableSpaceAroundMaze}
    ></Root>
  )
}

const Root = styled(UIImage)<{ $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * 0.07}px;
  height: ${(props) => props.$availableSpace * 0.07}px;
`
