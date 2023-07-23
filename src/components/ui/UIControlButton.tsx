import { styled } from "styled-components"

type UIControlButtonProps = { className?: string }

export const UIControlButton = ({ className }: UIControlButtonProps) => {
  return <Root className={className}></Root>
}

const Root = styled.div`
  width: 48px;
  height: 48px;
  background-color: lightgray;
  border-radius: 50%;
`
