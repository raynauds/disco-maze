import { styled } from "styled-components"
import { useDimensions } from "../../stores/dimensions.store"

export const UIBouncer = () => {
  const { cellWidth } = useDimensions()

  return <Root $size={cellWidth * 0.6}></Root>
}

const Root = styled.div<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  background-color: #aaeeff;
  border-radius: 20%;
`
