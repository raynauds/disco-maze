import { styled } from "styled-components"
import { MoveName } from "../../rune/logic"
import { useTranslations } from "../../translations/translations"
import { theme } from "../../theme/theme"
import { images } from "../../data/images"
import { useDimensions } from "../../stores/dimensions.store"
import { UIImage } from "../../components/ui/UIImage"

export type DancePerformedMovalType = "move-learned" | "move-performed-no-effect" | "move-performed-please-bouncer"

export type DancePerformedMovalProps = {
  type: DancePerformedMovalType
  userName: string
  userProfilePictureSrc: string
  moveName: MoveName
}

export const DancePerformedMoval = ({ userName, userProfilePictureSrc, moveName }: DancePerformedMovalProps) => {
  const { t } = useTranslations()
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  return (
    <Root>
      <TextContainer>
        <UserInfoContainer>
          <ProfilePictureContainer $availableWidth={availableWidth}>
            <UIImage src={images.fogOfWar || userProfilePictureSrc} alt={`user: ${userName}`} />
          </ProfilePictureContainer>
          <UserName $fontSizeRatio={fontSizeRatio}>{userName}</UserName>
        </UserInfoContainer>
        <TypeInfo>{}</TypeInfo>
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

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ProfilePictureContainer = styled.div<{ $availableWidth: number }>`
  width: ${(props) => props.$availableWidth * 0.1}px;
  height: ${(props) => props.$availableWidth * 0.1}px;
  min-width: ${(props) => props.$availableWidth * 0.1}px;
  min-height: ${(props) => props.$availableWidth * 0.1}px;
  margin-right: ${(props) => props.$availableWidth * 0.02}px;
  border-radius: 50%;
  overflow: hidden;
`

const UserName = styled.h2<{ $fontSizeRatio: number }>`
  font-family: ${theme.typography.h2.font};
  font-size: ${(props) => props.$fontSizeRatio * 24}px;
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
