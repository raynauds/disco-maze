import { styled } from "styled-components"
import { useTranslation } from "./i18n/i18n"
import { theme } from "./theme/theme"

const UITitle = styled.h1`
  color: ${theme.palette.primary.main};
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
`

function App() {
  const { t } = useTranslation()

  return (
    <div>
      <UITitle>{t.main.title}</UITitle>
    </div>
  )
}

export default App
