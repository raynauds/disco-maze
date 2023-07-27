import { styled } from "styled-components"

type UIPixelatedImageProps = {
  src: string
  alt: string
  className?: string
}

export const UIPixelatedImage = ({ src, alt, className }: UIPixelatedImageProps) => {
  return <PixelatedImage src={src} alt={alt} className={className} />
}

const PixelatedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: pixelated;
`
