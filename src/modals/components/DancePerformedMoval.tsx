import { useMemo } from "react"
import { styled } from "styled-components"
import { UIImage, UIPixelatedImage } from "../../components/ui/UIImage"
import { images } from "../../data/images"
import { MoveName, MovePerformedType } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { theme } from "../../theme/theme"
import { useTranslations } from "../../translations/translations"

export type DancePerformedMovalType = "move-learned" | MovePerformedType

export type DancePerformedMovalProps = {
  type: DancePerformedMovalType
  userName: string
  userProfilePictureSrc: string
  moveName: MoveName
}

export const DancePerformedMoval = ({ type, userName, userProfilePictureSrc, moveName }: DancePerformedMovalProps) => {
  const { t } = useTranslations()
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  const bouncerComment = useMemo(() => {
    return t.dancePerformedModal.info[type]()
  }, [t, type])

  const displayBouncerAvatar = type === "bouncer-pleased" || type === "bouncer-not-impressed"

  return (
    <Root>
      <TextContainer>
        <SectionContainer>
          <UserAvatarContainer $availableWidth={availableWidth}>
            <UIImage src={userProfilePictureSrc || images.fogOfWar} alt={`user: ${userName}`} />
          </UserAvatarContainer>
          <UserName $fontSizeRatio={fontSizeRatio}>{userName}</UserName>
        </SectionContainer>
        <SectionContainer>
          {displayBouncerAvatar ? (
            <BouncerAvatarContainer $availableWidth={availableWidth}>
              <UIPixelatedImage src={images.bouncer} alt="bouncer" />
            </BouncerAvatarContainer>
          ) : null}
          <TypeInfo $fontSizeRatio={fontSizeRatio}>{bouncerComment}</TypeInfo>
        </SectionContainer>
        <Title $fontSizeRatio={fontSizeRatio}>{t.moves[moveName]}</Title>
      </TextContainer>
      <MoveImage src={images.moves.large[moveName]} alt={`move: ${moveName}`} />
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

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${theme.spacing(2)};
`

const userAvatarSizeRatio = 0.08
const UserAvatarContainer = styled.div<{ $availableWidth: number }>`
  width: ${(props) => props.$availableWidth * userAvatarSizeRatio}px;
  height: ${(props) => props.$availableWidth * userAvatarSizeRatio}px;
  min-width: ${(props) => props.$availableWidth * userAvatarSizeRatio}px;
  min-height: ${(props) => props.$availableWidth * userAvatarSizeRatio}px;
  margin-right: ${(props) => props.$availableWidth * 0.02}px;
  border-radius: 50%;
  overflow: hidden;
`

const bouncerAvatarSizeRatio = 0.1
const BouncerAvatarContainer = styled.div<{ $availableWidth: number }>`
  width: ${(props) => props.$availableWidth * bouncerAvatarSizeRatio}px;
  height: ${(props) => props.$availableWidth * bouncerAvatarSizeRatio}px;
  min-width: ${(props) => props.$availableWidth * bouncerAvatarSizeRatio}px;
  min-height: ${(props) => props.$availableWidth * bouncerAvatarSizeRatio}px;
  margin-right: ${(props) => props.$availableWidth * 0.02}px;
  border-radius: 50%;
  overflow: hidden;
`

const UserName = styled.p<{ $fontSizeRatio: number }>`
  font-size: ${(props) => props.$fontSizeRatio * 16}px;
  text-align: center;
`

const TypeInfo = styled.p<{ $fontSizeRatio: number }>`
  font-size: ${(props) => props.$fontSizeRatio * 20}px;
  text-align: center;
`

const Title = styled.h2<{ $fontSizeRatio: number }>`
  font-family: ${theme.typography.h2.font};
  font-size: ${(props) => props.$fontSizeRatio * 48}px;
  text-align: center;
`

const MoveImage = styled.img`
  width: 100%;
  margin-top: ${theme.spacing(2)};
`
