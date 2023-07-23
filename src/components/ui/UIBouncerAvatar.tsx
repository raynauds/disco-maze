import { styled } from "styled-components"

type UIBouncerAvatarProps = Record<string, never>

export const UIBouncerAvatar = ({}: UIBouncerAvatarProps) => {
  return <Root></Root>
}

const Root = styled.div`
  width: 32px;
  height: 32px;
  background-color: lightgray;
  border-radius: 50%;
`
