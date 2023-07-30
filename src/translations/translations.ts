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
  ok: "OK",
  dancePerformedModal: {
    info: {
      "move-learned": () => "new move!",
      "no-effect": () => "dancing like no one's watching",
      "bouncer-not-impressed": () => {
        const comments = ["« is that all? »", "« come again? »", "« got anything else? »", "« cool, but unexpected »"]
        const randomComment = getRandomItemFromArray(comments) || comments[0]
        return randomComment
      },
      "bouncer-pleased": () => {
        const comments = [
          "« awesome! »",
          "« great! »",
          "« impressive! »",
          "« groovy! »",
          "« neat! »",
          "« funky! »",
          "« brilliant! »",
          "« insane! »",
          "« nice! »",
          "« cool! »",
        ]
        const randomComment = getRandomItemFromArray(comments) || comments[0]
        return randomComment
      },
    },
  },
}

export const useTranslations = () => {
  return { t: en }
}
