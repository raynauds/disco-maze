import { animated, useSpring } from "@react-spring/web"
import { ReactNode, useCallback, useEffect, useRef } from "react"
import { styled } from "styled-components"
import useSound from "use-sound"
import { useDimensions } from "../stores/dimensions.store"
import { theme } from "../theme/theme"

import dance1Sound from "../assets/sounds/dance_1.mp3"
import dance2Sound from "../assets/sounds/dance_2.mp3"
import dance3Sound from "../assets/sounds/dance_3.mp3"
import dance4Sound from "../assets/sounds/dance_4.mp3"
import dance5Sound from "../assets/sounds/dance_5.mp3"
import dance6Sound from "../assets/sounds/dance_6.mp3"
import { MoveName } from "../rune/logic"
import { useMuteBackgroundMusic, useUnmuteBackgroundMusic } from "../stores/sounds.store"
import { DancePerformedModal } from "./components/DancePerformedModal"
import { GameInformationModal } from "./components/GameInformationModal"
import { useIsModalVisible, useModal } from "./modal.store"
import { ModalConfig } from "./modal.types"

const BACKGROUND_MUTE_MS = 2000

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

  const muteBackgroundMusic = useMuteBackgroundMusic()
  const unmuteBackgroundMusic = useUnmuteBackgroundMusic()

  const [playDance1Sound] = useSound(dance1Sound, {
    volume: 0.7,
  })
  const [playDance2Sound] = useSound(dance2Sound, {
    volume: 0.9,
  })
  const [playDance3Sound] = useSound(dance3Sound, {
    volume: 0.6,
  })
  const [playDance4Sound] = useSound(dance4Sound, {
    volume: 0.7,
  })
  const [playDance5Sound] = useSound(dance5Sound, {
    volume: 0.7,
  })
  const [playDance6Sound] = useSound(dance6Sound, {
    volume: 0.7,
  })

  const playDanceSound = useCallback(
    (move: MoveName) => {
      muteBackgroundMusic()

      switch (move) {
        case "front-and-back":
          playDance1Sound()
          break
        case "the-turn-around":
          playDance2Sound()
          break
        case "roll-the-wrists":
          playDance3Sound()
          break
        case "the-bump":
          playDance4Sound()
          break
        case "the-travolta":
          playDance5Sound()
          break
        case "the-chicken":
          playDance6Sound()
      }
      const timeout = setTimeout(() => {
        unmuteBackgroundMusic()
      }, BACKGROUND_MUTE_MS)

      return () => {
        clearTimeout(timeout)
      }
    },
    [
      muteBackgroundMusic,
      playDance1Sound,
      playDance2Sound,
      playDance3Sound,
      playDance4Sound,
      playDance5Sound,
      playDance6Sound,
      unmuteBackgroundMusic,
    ],
  )

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
      if (modal?.type === "dance-performed") {
        playDanceSound(modal.props.moveName)
      }
      displayStatus.current = "shown"
    }
    if (!isModalVisible && displayStatus.current === "shown") {
      hide()
      displayStatus.current = "hidden"
    }
  }, [isModalVisible, show, hide, modal, playDanceSound])

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
      return <DancePerformedModal {...config.props} />
    case "game-information":
      return <GameInformationModal />
  }
}

const Root = styled.div`
  position: relative;
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
`
