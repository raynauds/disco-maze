import { styled } from "styled-components"
import { images } from "../../data/images"
import { Direction } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { UIPixelatedImage } from "./UIImage"

type UIControlButtonProps = {
  direction: Direction
  className?: string
  onClick: () => void
}

export const UIControlButton = ({ direction, className, onClick }: UIControlButtonProps) => {
  const { availableWidth, aspectRatio } = useDimensions()

  const height = availableWidth / aspectRatio
  const availableSpace = Math.min(height - availableWidth, availableWidth)

  return (
    <Root onClick={onClick} className={className} $availableSpace={availableSpace}>
      <UIPixelatedImage src={images.arrows[direction]} alt={`moving direction: ${direction}`} />
    </Root>
  )
}

const Root = styled.button<{ $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * 0.13}px;
  height: ${(props) => props.$availableSpace * 0.13}px;
  background-color: lightgray;
  border-radius: 50%;
`
