import { useEffect, useRef } from "react"
import { styled } from "styled-components"
import { images } from "../../data/images"
import { Direction } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { UIImage } from "./UIImage"

type UIControlButtonProps = {
  direction: Direction
  className?: string
  actionFrequencyMs: number
  onClick: () => void
}

export const UIControlButton = ({ direction, className, actionFrequencyMs, onClick }: UIControlButtonProps) => {
  const { availableSpaceAroundMaze } = useDimensions()
  const timeout = useRef<number | null>(null)
  const nextTimeoutExecutionMs = useRef(0)
  const isPressed = useRef(false)

  // handle continuous movement while a movement key is pressed
  useEffect(() => {
    if (!isPressed.current) {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      return
    }

    const resetTimeout = ({ newTimeoutMs }: { newTimeoutMs: number }) => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      timeout.current = setTimeout(onClick, newTimeoutMs)
      nextTimeoutExecutionMs.current = Date.now() + newTimeoutMs
    }

    if (Date.now() >= nextTimeoutExecutionMs.current) {
      resetTimeout({ newTimeoutMs: actionFrequencyMs })
      return
    }
    // if onClick changes before the execution of the timeout, cancel the timeout and create a new one with the updated onClick
    const timeBeforeNextExecution = nextTimeoutExecutionMs.current - Date.now()
    resetTimeout({ newTimeoutMs: timeBeforeNextExecution })
  }, [onClick, actionFrequencyMs, direction])

  const onMouseDown = () => {
    onClick()
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(onClick, actionFrequencyMs)
    nextTimeoutExecutionMs.current = Date.now() + actionFrequencyMs
    isPressed.current = true
  }

  const onMouseUp = () => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    isPressed.current = false
  }

  return (
    <Root
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className={className}
      $availableSpace={availableSpaceAroundMaze}
    >
      <ControlImage src={images.arrows[direction]} alt={`moving direction: ${direction}`} />
    </Root>
  )
}

const Root = styled.button<{ $availableSpace: number }>`
  width: ${(props) => props.$availableSpace * 0.13}px;
  height: ${(props) => props.$availableSpace * 0.13}px;
  &:active {
    scale: 0.9;
  }
`

const ControlImage = styled(UIImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
