import { MoveName } from "../rune/logic"

const moveImages: Record<MoveName, string> = {
  "front-and-back": "src/assets/images/move_1.png",
  "the-turn-around": "src/assets/images/move_2.png",
  "roll-the-wrists": "src/assets/images/move_3.png",
  "the-chicken": "src/assets/images/move_4.png",
  "the-bump": "src/assets/images/move_5.png",
  "the-travolta": "src/assets/images/move_6.png",
}

export const images = {
  dancers: [
    "src/assets/images/dancer_1.png",
    "src/assets/images/dancer_2.png",
    "src/assets/images/dancer_3.png",
    "src/assets/images/dancer_4.png",
  ],
  bouncer: "src/assets/images/bouncer.png",
  doorClosed: "src/assets/images/door_closed.png",
  doorOpen: "src/assets/images/door_open.png",
  moves: moveImages,
  arrows: {
    top: "src/assets/images/arrow_up.png",
    right: "src/assets/images/arrow_right.png",
    bottom: "src/assets/images/arrow_down.png",
    left: "src/assets/images/arrow_left.png",
  },
}
