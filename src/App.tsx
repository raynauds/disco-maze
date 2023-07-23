import { animated, useSpring } from "@react-spring/web"
import { styled } from "styled-components"
import { useTranslation } from "./i18n/i18n"
import { theme } from "./theme/theme"

const UITitle = styled(animated.h1)`
  color: ${theme.palette.primary.main};
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
`

function App() {
  const { t } = useTranslation()
  const [springs, api] = useSpring(() => ({
    rotate: 0,
  }))

  const roll = () => {
    api.start({
      from: { rotate: 0 },
      to: { rotate: 360 },
    })
  }

  return (
    <div>
      <UITitle style={{ ...springs }} onClick={roll}>
        {t.main.title}
      </UITitle>
    </div>
  )
}

export default App
