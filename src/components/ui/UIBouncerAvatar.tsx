import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"

type UIBouncerAvatarSize = "small" | "medium"

type UIBouncerAvatarProps = {
  size: UIBouncerAvatarSize
}

export const UIBouncerAvatar = ({ size }: UIBouncerAvatarProps) => {
  const { availableSpaceAroundMaze } = useDimensions()

  return <Root src={images.bouncer} $size={size} $availableSpace={availableSpaceAroundMaze}></Root>
}

const Root = styled.img<{ $size: UIBouncerAvatarSize; $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * (props.$size === "small" ? theme.availableWidthFraction.small : 0.12)}px;
  height: ${(props) => props.$availableSpace * (props.$size === "small" ? theme.availableWidthFraction.small : 0.12)}px;
  image-rendering: pixelated;
`
