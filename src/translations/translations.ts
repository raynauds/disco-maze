import { MoveName } from "../rune/logic"

const moves: Record<MoveName, string> = {
  "front-and-back": "front and back",
  "the-turn-around": "the turn around",
  "roll-the-wrists": "roll the wrists",
  "the-bump": "the bump",
  "the-travolta": "the travolta",
  "the-chicken": "the chicken",
}

const en = {
  title: "Disco Maze",
  moves,
  performedBy: ({ userName }: { userName: string }) => `performed by ${userName}`,
}

export const useTranslations = () => {
  return { t: en }
}
