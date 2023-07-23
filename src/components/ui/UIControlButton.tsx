import { styled } from "styled-components"

type UIControlButtonProps = {
  onClick: () => void
  className?: string
}

export const UIControlButton = ({ onClick, className }: UIControlButtonProps) => {
  return <Root onClick={onClick} className={className}></Root>
}

const Root = styled.button`
  width: 48px;
  height: 48px;
  background-color: lightgray;
  border-radius: 50%;
`
