import { ReactNode, useCallback, useEffect, useRef } from "react"
import { DancePerformedMoval } from "./components/DancePerformedMoval"
import { useIsModalVisible, useModal } from "./modal.store"
import { styled } from "styled-components"
import { useDimensions } from "../stores/dimensions.store"
import { animated, useSpring } from "@react-spring/web"
import { theme } from "../theme/theme"
import { ModalConfig } from "./modal.types"

type ModalProviderProps = {
  children: ReactNode
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const { availableWidth, aspectRatio } = useDimensions()
  const availableHeigh = availableWidth / aspectRatio
  const modal = useModal()
  const isModalVisible = useIsModalVisible()
  const displayStatus = useRef<"shown" | "hidden">("hidden")
  const [springs, api] = useSpring(() => ({
    from: { left: `-100vw` },
  }))

  const show = useCallback(() => {
    api.start({
      to: {
        left: "0",
      },
    })
  }, [api])

  const hide = useCallback(() => {
    api.start({
      to: {
        left: `-100vw`,
      },
    })
  }, [api])

  useEffect(() => {
    if (isModalVisible && displayStatus.current === "hidden") {
      show()
      displayStatus.current = "shown"
    }
    if (!isModalVisible && displayStatus.current === "shown") {
      hide()
      displayStatus.current = "hidden"
    }
  }, [isModalVisible, show, hide])

  return (
    <Root>
      {children}
      <ModalContainer id="modal-container" style={{ left: springs.left }}>
        <ModalContentContainer $availableWidth={availableWidth} $availableHeigh={availableHeigh}>
          {modal ? <ModalContent key={modal.type} config={modal} /> : null}
        </ModalContentContainer>
      </ModalContainer>
    </Root>
  )
}

type ModalContentProps = {
  config: ModalConfig
}

const ModalContent = ({ config }: ModalContentProps) => {
  switch (config.type) {
    case "dance-performed":
      return <DancePerformedMoval {...config.props} />
  }
}

const Root = styled.div`
position: relative
  width: 100%;
  height: 100%;
`

const ModalContainer = styled(animated.div)`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  pointer-events: none;
`

const ModalContentContainer = styled.div<{
  $availableWidth: number
  $availableHeigh: number
}>`
  width: ${(props) => props.$availableWidth * 0.9}px;
  max-height: ${(props) => props.$availableHeigh * 0.9}px;
  border: 2px solid ${theme.palette.border.main};
  border-radius: 16px;
  background-color: ${theme.palette.background.light};
  pointer-events: none;
`
