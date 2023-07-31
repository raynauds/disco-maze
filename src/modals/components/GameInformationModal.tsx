import { styled } from "styled-components"
import { UIButton } from "../../components/ui/UIButton"
import { UIContainedImage, UIPixelatedImage } from "../../components/ui/UIImage"
import { UIMove } from "../../components/ui/UIMove"
import { images } from "../../data/images"
import { MAX_LEVEL } from "../../rune/logic"
import { useDimensions } from "../../stores/dimensions.store"
import { useGame, useYourPlayerId } from "../../stores/game.store"
import { theme } from "../../theme/theme"
import { useTranslations } from "../../translations/translations"
import { useCloseModal } from "../modal.store"

export const GameInformationModal = () => {
  const { t } = useTranslations()
  const closeModal = useCloseModal()
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375
  const game = useGame()
  const yourPlayerId = useYourPlayerId()
  const player = yourPlayerId ? game.players[yourPlayerId] : Object.values(game.players)[0]
  const characterAvatar = images.dancers[player.avatarIndex]

  return (
    <Root>
      <Title $fontSizeRatio={fontSizeRatio}>{t.title}</Title>

      <InformationGrid>
        {/* COLLECT MOVE */}
        <Cell $availableWidth={availableWidth}>
          <UIPixelatedImage src={characterAvatar} alt="your character" />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Plus />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <UIPixelatedImage src={images.walls.top} alt="maze cell" />
          <MoveButton />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Equal />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <MoveButton />
        </Cell>
        {/* IMPRESS BOUNCER */}
        <Cell $availableWidth={availableWidth}>
          <MoveButton />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Plus />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <UIPixelatedImage src={images.bouncer} alt="the bouncer" />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Equal />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <MoveChecked />
        </Cell>
        {/* OPEN DOOR */}
        <Cell $availableWidth={availableWidth}>
          <MoveChecked />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <MoveChecked />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <MoveChecked />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Equal />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <UIPixelatedImage src={images.doorOpen} alt="door open" />
        </Cell>
        {/* WIN */}
        <Cell $availableWidth={availableWidth}>
          <UIPixelatedImage src={images.doorOpen} alt="door open" />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Multiply />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <CellContentText $fontSizeRatio={fontSizeRatio}>{MAX_LEVEL}</CellContentText>
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Equal />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <CellContentText $fontSizeRatio={fontSizeRatio}>🏆</CellContentText>
        </Cell>

        {/* LOSE */}
        <Cell $availableWidth={availableWidth}></Cell>
        <Cell $availableWidth={availableWidth}>
          <CellContentText $fontSizeRatio={fontSizeRatio}>0:00</CellContentText>
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <CellContentText $fontSizeRatio={fontSizeRatio}>⌛</CellContentText>
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <Equal />
        </Cell>
        <Cell $availableWidth={availableWidth}>
          <CellContentText $fontSizeRatio={fontSizeRatio}>☠️</CellContentText>
        </Cell>
      </InformationGrid>

      <UIButton title={t.ok} onClick={closeModal} />
    </Root>
  )
}

const MoveButton = () => {
  const { availableWidth } = useDimensions()

  return (
    <>
      <MoveContainer $availableWidth={availableWidth}>
        <MoveButtonImage $availableWidth={availableWidth} src={images.buttonIdle} alt="button for move" />
      </MoveContainer>
      <MoveContainer $availableWidth={availableWidth}>
        <UIMove id="the-turn-around" size={availableWidth * 0.05} />
      </MoveContainer>
    </>
  )
}

const MoveChecked = () => {
  const { availableWidth } = useDimensions()

  return (
    <>
      <MoveContainer $availableWidth={availableWidth}>
        <UIMove id="the-turn-around" size={availableWidth * 0.08} />
      </MoveContainer>
      <MoveCheckContainer $availableWidth={availableWidth}>
        <UIContainedImage src={images.checkmark} alt="button for move" />
      </MoveCheckContainer>
    </>
  )
}

const Plus = () => {
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  return <Text $fontSizeRatio={fontSizeRatio}>➕</Text>
}

const Multiply = () => {
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  return <Text $fontSizeRatio={fontSizeRatio}>✖️</Text>
}

const Equal = () => {
  const { availableWidth } = useDimensions()
  const fontSizeRatio = availableWidth / 375

  return <Text $fontSizeRatio={fontSizeRatio}>🟰</Text>
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${theme.spacing(3)};
  padding-bottom: ${theme.spacing(3)};
`

const Title = styled.h2<{ $fontSizeRatio: number }>`
  font-family: ${theme.typography.h2.font};
  font-size: ${(props) => props.$fontSizeRatio * 48}px;
  text-align: center;
  margin-bottom: ${theme.spacing(2)};
`

const InformationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  padding-bottom: ${theme.spacing(3)};
`

const Cell = styled.div<{ $availableWidth: number }>`
  position: relative;
  width: ${(props) => props.$availableWidth * 0.15}px;
  height: ${(props) => props.$availableWidth * 0.15}px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.$availableWidth * 0.02}px;
`

const Text = styled.p<{ $fontSizeRatio: number }>`
  font-size: ${(props) => props.$fontSizeRatio * 16}px;
  text-align: center;
`

const MoveContainer = styled.div<{ $availableWidth: number }>`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoveButtonImage = styled(UIContainedImage)<{ $availableWidth: number }>`
  width: ${(props) => props.$availableWidth * 0.07}px;
  height: ${(props) => props.$availableWidth * 0.07}px;
`

const MoveCheckContainer = styled.div<{ $availableWidth: number }>`
  position: absolute;
  bottom: ${(props) => props.$availableWidth * 0.025}px;
  right: ${(props) => props.$availableWidth * 0.025}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$availableWidth * 0.05}px;
  height: ${(props) => props.$availableWidth * 0.05}px;
`

const CellContentText = styled.p<{ $fontSizeRatio: number }>`
  font-family: ${theme.typography.h2.font};
  font-size: ${(props) => props.$fontSizeRatio * 32}px;
  text-align: center;
`
