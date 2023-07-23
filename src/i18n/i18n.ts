const en = {
  main: {
    title: "Disco Maze",
  },
} as const

export const useTranslation = () => {
  return { t: en }
}
