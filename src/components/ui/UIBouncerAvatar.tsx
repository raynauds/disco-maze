import { styled } from "styled-components"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { UIImage } from "./UIImage"

type UIBouncerAvatarSize = "small" | "medium"

type UIBouncerAvatarProps = {
  size: UIBouncerAvatarSize
}

export const UIBouncerAvatar = ({ size }: UIBouncerAvatarProps) => {
  const { availableSpaceAroundMaze } = useDimensions()

  return <Root src={images.bouncer} alt="Bouncer" $size={size} $availableSpace={availableSpaceAroundMaze}></Root>
}

const Root = styled(UIImage)<{ $size: UIBouncerAvatarSize; $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * (props.$size === "small" ? theme.availableWidthFraction.small : 0.12)}px;
  height: ${(props) => props.$availableSpace * (props.$size === "small" ? theme.availableWidthFraction.small : 0.12)}px;
  image-rendering: pixelated;
`
