import { MoveName, getRandomItemFromArray } from "../rune/logic"

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
  dancePerformedModal: {
    info: {
      "move-learned": () => "new move!",
      "move-performed-no-effect": () => {
        const comments = ["awesome!", "great!", "impressive!", "groovy!"]
        const randomComment = getRandomItemFromArray(comments) || comments[0]
        return randomComment
      },
      "move-performed-please-bouncer": () => "",
    },
  },
}

export const useTranslations = () => {
  return { t: en }
}
