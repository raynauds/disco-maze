import { styled } from "styled-components"
import { images } from "../../data/images"
import { MoveName } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { UIImage } from "./UIImage"
import { UIMove } from "./UIMove"

type UIMoveButtonProps = {
  id?: MoveName
  isDisabled?: boolean
  onClick?: () => void
}

export const UIMoveButton = ({ id, isDisabled, onClick }: UIMoveButtonProps) => {
  const { availableSpaceAroundMaze } = useDimensions()

  const size = availableSpaceAroundMaze * theme.availableWidthFraction.large

  return (
    <Root onClick={onClick} disabled={!onClick} $size={size} $hasMove={!!id}>
      {id ? <UIMove id={id} size="medium" /> : null}
      {isDisabled ? <MoveSlotDisabledIcon src={images.locked} alt="move slot unavailable" /> : null}
    </Root>
  )
}

const Root = styled.button<{ $size: number; $hasMove: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  padding-bottom: 4px;
  background-image: ${(props) => `url(${props.$hasMove ? images.buttonIdle : images.buttonPressed})`};
  &:active {
    scale: ${(props) => (props.$hasMove ? 0.9 : 1)};
  }
  &:active img {
    scale: 0.9;
  }
  background-size: contain;
  background-repeat: no-repeat;
`

const MoveSlotDisabledIcon = styled(UIImage)`
  position: absolute;
  inset: 0;
  scale: 0.8;
  filter: brightness(50%);
`
