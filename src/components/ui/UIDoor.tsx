import { styled } from "styled-components"
import { useDimensions } from "../../stores/dimensions.store"

export const UIDoor = () => {
  const { cellWidth } = useDimensions()

  return <Root $size={cellWidth * 0.6}></Root>
}

const Root = styled.div<{ $size: number }>`
  /* width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px; */
  width: 30px;
  height: 30px;
  background-color: #a17b15;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
`
