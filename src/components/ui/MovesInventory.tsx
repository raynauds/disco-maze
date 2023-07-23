import { styled } from "styled-components"
import { theme } from "../../theme/theme"
import { UIMove } from "./UIMove"

type MovesInventoryProps = Record<string, never>

export const MovesInventory = ({}: MovesInventoryProps) => {
  return (
    <Root>
      <UIMove size="large" />
      <UIMove size="large" />
      <UIMove size="large" />
      <UIMove size="large" />
    </Root>
  )
}

const Root = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: ${theme.spacing(2)};
`
