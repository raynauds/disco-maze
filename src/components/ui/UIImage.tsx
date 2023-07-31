import { styled } from "styled-components"

type UIImageProps = {
  src: string
  alt: string
  className?: string
}

export const UIImage = ({ src, alt, className }: UIImageProps) => {
  return <Image src={src} alt={alt} className={className} />
}

export const UIContainedImage = ({ src, alt, className }: UIImageProps) => {
  return <ContainedImage src={src} alt={alt} className={className} />
}

export const UIPixelatedImage = ({ src, alt, className }: UIImageProps) => {
  return <PixelatedImage src={src} alt={alt} className={className} />
}

const Image = styled.img`
  pointer-events: none;
`

const ContainedImage = styled(UIImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const PixelatedImage = styled(UIImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
`
