import { styled } from "styled-components"
import { images } from "../../data/images"

export const UIFogOfWar = () => {
  return <Root src={images.fogOfWar} />
}

const Root = styled.img`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`
