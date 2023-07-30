import { styled } from "styled-components"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"

type UIButtonProps = {
  title: string
  className?: string
  onClick: () => void
}

export const UIButton = ({ title, className, onClick }: UIButtonProps) => {
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  return (
    <Root onClick={onClick} className={className} $availableWidth={availableWidth} $fontSizeRatio={fontSizeRatio}>
      {title}
    </Root>
  )
}

const Root = styled.button<{ $availableWidth: number; $fontSizeRatio: number }>`
  font-size: ${(props) => props.$fontSizeRatio * 28}px;
  font-weight: 600;
  color: ${theme.palette.border.main};
  width: ${(props) => props.$availableWidth * 0.3}px;
  height: ${(props) => props.$availableWidth * 0.15}px;
  border-radius: ${(props) => props.$availableWidth * 0.1}px;
  border: 3px solid ${theme.palette.border.main};

  &:active {
    scale: 0.9;
  }
`
