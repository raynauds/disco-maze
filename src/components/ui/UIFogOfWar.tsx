import { styled } from "styled-components"
import { images } from "../../data/images"
import { UIImage } from "./UIImage"

export const UIFogOfWar = () => {
  return <Root src={images.fogOfWar} alt="" />
}

const Root = styled(UIImage)`
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
`
