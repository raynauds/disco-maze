import { MoveName } from "../rune/logic"

import bouncer from "../assets/images/bouncer.png"

const moveImagesSmall: Record<MoveName, string> = {
  "front-and-back": "src/assets/images/move_1.png",
  "the-turn-around": "src/assets/images/move_2.png",
  "roll-the-wrists": "src/assets/images/move_3.png",
  "the-chicken": "src/assets/images/move_4.png",
  "the-bump": "src/assets/images/move_5.png",
  "the-travolta": "src/assets/images/move_6.png",
}

const moveImagesLarge: Record<MoveName, string> = {
  "front-and-back": "src/assets/images/move_1_large.png",
  "the-turn-around": "src/assets/images/move_2_large.png",
  "roll-the-wrists": "src/assets/images/move_3_large.png",
  "the-chicken": "src/assets/images/move_4_large.png",
  "the-bump": "src/assets/images/move_5_large.png",
  "the-travolta": "src/assets/images/move_6_large.png",
}

export const images = {
  dancers: [
    "src/assets/images/dancer_1.png",
    "src/assets/images/dancer_2.png",
    "src/assets/images/dancer_3.png",
    "src/assets/images/dancer_4.png",
  ],
  bouncer,
  doorClosed: "src/assets/images/door_closed.png",
  doorOpen: "src/assets/images/door_open.png",
  moves: {
    small: moveImagesSmall,
    large: moveImagesLarge,
  },
  arrows: {
    top: "src/assets/images/arrow_up.png",
    right: "src/assets/images/arrow_right.png",
    bottom: "src/assets/images/arrow_down.png",
    left: "src/assets/images/arrow_left.png",
  },
  locked: "src/assets/images/locked.png",
  background: "src/assets/images/background.png",
  checkboxEmpty: "src/assets/images/checkbox_empty.png",
  checkboxFilled: "src/assets/images/checkbox_filled.png",
  checkmark: "src/assets/images/checkmark.png",
  buttonIdle: "src/assets/images/button_idle.png",
  buttonPressed: "src/assets/images/button_pressed.png",
  radioEmpty: "src/assets/images/radio_empty.png",
  radioFilledGreen: "src/assets/images/radio_filled_green.png",
  radioFilledGrey: "src/assets/images/radio_filled_grey.png",
  walls: {
    none: "src/assets/images/wall_none.png",
    top: "src/assets/images/wall_top.png",
    right: "src/assets/images/wall_right.png",
    bottom: "src/assets/images/wall_bottom.png",
    left: "src/assets/images/wall_left.png",
    topBottom: "src/assets/images/wall_top_bottom.png",
    rightLeft: "src/assets/images/wall_right_left.png",
    topRight: "src/assets/images/wall_top_right.png",
    rightBottom: "src/assets/images/wall_right_bottom.png",
    bottomLeft: "src/assets/images/wall_bottom_left.png",
    topLeft: "src/assets/images/wall_top_left.png",
    topRightBottom: "src/assets/images/wall_top_right_bottom.png",
    rightBottomLeft: "src/assets/images/wall_right_bottom_left.png",
    topBottomLeft: "src/assets/images/wall_top_bottom_left.png",
    topRightLeft: "src/assets/images/wall_top_right_left.png",
  },
  fogOfWar: "src/assets/images/fog_of_war.png",
}
