import { MoveName } from "../rune/logic"

import arrowBottom from "../assets/images/arrow_down.png"
import arrowLeft from "../assets/images/arrow_left.png"
import arrowRight from "../assets/images/arrow_right.png"
import arrowTop from "../assets/images/arrow_up.png"
import background from "../assets/images/background.png"
import bouncer from "../assets/images/bouncer.png"
import buttonIdle from "../assets/images/button_idle.png"
import buttonPressed from "../assets/images/button_pressed.png"
import checkboxEmpty from "../assets/images/checkbox_empty.png"
import checkboxFilled from "../assets/images/checkbox_filled.png"
import checkmark from "../assets/images/checkmark.png"
import dancer1 from "../assets/images/dancer_1.png"
import dancer2 from "../assets/images/dancer_2.png"
import dancer3 from "../assets/images/dancer_3.png"
import dancer4 from "../assets/images/dancer_4.png"
import doorClosed from "../assets/images/door_closed.png"
import doorOpen from "../assets/images/door_open.png"
import fogOfWar from "../assets/images/fog_of_war.png"
import locked from "../assets/images/locked.png"
import frontAndBack from "../assets/images/move_1.png"
import theFrontAndBackLarge from "../assets/images/move_1_large.png"
import theTurnAround from "../assets/images/move_2.png"
import theTurnAroundLarge from "../assets/images/move_2_large.png"
import rollTheWrists from "../assets/images/move_3.png"
import rollTheWristsLarge from "../assets/images/move_3_large.png"
import theChicken from "../assets/images/move_4.png"
import theChickenLarge from "../assets/images/move_4_large.png"
import theBump from "../assets/images/move_5.png"
import theBumpLarge from "../assets/images/move_5_large.png"
import theTravolta from "../assets/images/move_6.png"
import theTravoltaLarge from "../assets/images/move_6_large.png"
import radioEmpty from "../assets/images/radio_empty.png"
import radioFilledGreen from "../assets/images/radio_filled_green.png"
import radioFilledGrey from "../assets/images/radio_filled_grey.png"
import wallBottom from "../assets/images/wall_bottom.png"
import wallBottomLeft from "../assets/images/wall_bottom_left.png"
import wallLeft from "../assets/images/wall_left.png"
import wallNone from "../assets/images/wall_none.png"
import wallRight from "../assets/images/wall_right.png"
import wallRightBottom from "../assets/images/wall_right_bottom.png"
import wallRrightBottomLeft from "../assets/images/wall_right_bottom_left.png"
import wallRightLeft from "../assets/images/wall_right_left.png"
import wallTop from "../assets/images/wall_top.png"
import wallTopBottom from "../assets/images/wall_top_bottom.png"
import wallTopBottomLeft from "../assets/images/wall_top_bottom_left.png"
import wallTopLeft from "../assets/images/wall_top_left.png"
import wallTopRight from "../assets/images/wall_top_right.png"
import wallTopRightBottom from "../assets/images/wall_top_right_bottom.png"
import wallTopRightLeft from "../assets/images/wall_top_right_left.png"

const moveImagesSmall: Record<MoveName, string> = {
  "front-and-back": frontAndBack,
  "the-turn-around": theTurnAround,
  "roll-the-wrists": rollTheWrists,
  "the-chicken": theChicken,
  "the-bump": theBump,
  "the-travolta": theTravolta,
}

const moveImagesLarge: Record<MoveName, string> = {
  "front-and-back": theFrontAndBackLarge,
  "the-turn-around": theTurnAroundLarge,
  "roll-the-wrists": rollTheWristsLarge,
  "the-chicken": theChickenLarge,
  "the-bump": theBumpLarge,
  "the-travolta": theTravoltaLarge,
}

export const images = {
  dancers: [dancer1, dancer2, dancer3, dancer4],
  bouncer,
  doorClosed,
  doorOpen,
  moves: {
    small: moveImagesSmall,
    large: moveImagesLarge,
  },
  arrows: {
    top: arrowTop,
    right: arrowRight,
    bottom: arrowBottom,
    left: arrowLeft,
  },
  locked,
  background,
  checkboxEmpty,
  checkboxFilled,
  checkmark,
  buttonIdle,
  buttonPressed,
  radioEmpty,
  radioFilledGreen,
  radioFilledGrey,
  walls: {
    none: wallNone,
    top: wallTop,
    right: wallRight,
    bottom: wallBottom,
    left: wallLeft,
    topBottom: wallTopBottom,
    rightLeft: wallRightLeft,
    topRight: wallTopRight,
    rightBottom: wallRightBottom,
    bottomLeft: wallBottomLeft,
    topLeft: wallTopLeft,
    topRightBottom: wallTopRightBottom,
    rightBottomLeft: wallRrightBottomLeft,
    topBottomLeft: wallTopBottomLeft,
    topRightLeft: wallTopRightLeft,
  },
  fogOfWar,
}
