import { styled } from "styled-components"

type UIMoveSize = "small" | "medium" | "large"

type UIMoveProps = {
  size: UIMoveSize
}

export const UIMove = ({ size }: UIMoveProps) => {
  return <Root $size={size}></Root>
}

const Root = styled.div<{ $size: UIMoveSize }>`
  width: ${(props) => moveSizes[props.$size]}px;
  height: ${(props) => moveSizes[props.$size]}px;
  background-color: lightgray;
  border-radius: 4px;
`

const moveSizes: Record<UIMoveSize, number> = {
  small: 24,
  medium: 32,
  large: 64,
}
