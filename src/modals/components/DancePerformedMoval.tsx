import { styled } from "styled-components"
import { MoveName } from "../../rune/logic"
import { useTranslations } from "../../translations/translations"
import { theme } from "../../theme/theme"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { useEffect } from "react"
import { useCloseModal } from "../modal.store"

export type DancePerformedMovalProps = {
  userName: string
  moveName: MoveName
}

export const DancePerformedMoval = ({ userName, moveName }: DancePerformedMovalProps) => {
  const closeModal = useCloseModal()
  const { t } = useTranslations()
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeModal()
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <Root>
      <TextContainer>
        <Title $fontSizeRatio={fontSizeRatio}>{t.moves[moveName]}</Title>
        <PerformedBy $fontSizeRatio={fontSizeRatio}>{t.performedBy({ userName })}</PerformedBy>
      </TextContainer>
      <MoveImage src={images.moves.large[moveName]} />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(2)};
`

const TextContainer = styled.div`
  padding-left: ${theme.spacing(2)};
  padding-right: ${theme.spacing(2)};
`

const Title = styled.h2<{ $fontSizeRatio: number }>`
  font-family: ${theme.typography.h2.font};
  font-size: ${(props) => props.$fontSizeRatio * 48}px;
  text-align: center;
`

const PerformedBy = styled.p<{ $fontSizeRatio: number }>`
  font-size: ${(props) => props.$fontSizeRatio * 14}px;
  text-align: center;
`

const MoveImage = styled.img`
  width: 100%;
  margin-top: ${theme.spacing(2)};
`
