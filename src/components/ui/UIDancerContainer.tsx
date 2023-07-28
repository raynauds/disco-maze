import { animated, easings, useSpring } from "@react-spring/web"
import { ReactNode } from "react"
import { styled } from "styled-components"

type UIDancerContainerProps = {
  xAbsolute: number
  yAbsolute: number
  cellWidth: number
  children: ReactNode
}

export const UIDancerContainer = ({ xAbsolute, yAbsolute, cellWidth, children }: UIDancerContainerProps) => {
  const { left, top } = useSpring({
    left: `${xAbsolute}px`,
    top: `${yAbsolute}px`,
    config: {
      tension: 200,
      easing: easings.easeInBack,
    },
  })

  return (
    <Root style={{ left, top }} $size={cellWidth}>
      {children}
    </Root>
  )
}

const Root = styled(animated.div)<{ $size: number }>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`
