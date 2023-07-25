import { create } from "zustand"

import { useEffect } from "react"
import { shallow } from "zustand/shallow"
import { MAZE_SIZE } from "../rune/logic"

export const MAZE_HORIZONTAL_MARGIN_PX = 8
export const MAX_ASPECT_RATIO = 560 / 880

const getAvailableWidth = () => {
  const maxWidth = window.innerHeight * MAX_ASPECT_RATIO
  const width = Math.min(window.innerWidth, maxWidth)
  return width - MAZE_HORIZONTAL_MARGIN_PX * 2
}

type DimensionsStore = {
  availableWidth: number
  cellWidth: number
  setDimensions: (dimensions: { availableWidth: number; cellWidth: number }) => void
}

export const useDimensionsStore = create<DimensionsStore>()((set) => ({
  availableWidth: getAvailableWidth(),
  cellWidth: getAvailableWidth() / MAZE_SIZE,
  setDimensions: ({ availableWidth, cellWidth }) => set(() => ({ availableWidth, cellWidth })),
}))

export const useDimensions = () => {
  return useDimensionsStore((state) => ({ availableWidth: state.availableWidth, cellWidth: state.cellWidth }), shallow)
}

export const useResponsive = () => {
  const setDimensions = useDimensionsStore((state) => state.setDimensions)

  useEffect(() => {
    const onResize = () => {
      const availableWidth = getAvailableWidth()
      const cellWidth = availableWidth / MAZE_SIZE
      setDimensions({ availableWidth, cellWidth })
    }

    window.addEventListener("resize", onResize)
    onResize()

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [setDimensions])
}
