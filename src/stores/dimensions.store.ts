import { create } from "zustand"

import { useEffect } from "react"
import { shallow } from "zustand/shallow"
import { MAZE_SIZE } from "../rune/logic"

export const MAZE_HORIZONTAL_MARGIN_PX = 8
export const MAX_ASPECT_RATIO = 560 / 880

export const getAvailableWidth = () => {
  const maxWidth = window.innerHeight * MAX_ASPECT_RATIO
  const width = Math.min(window.innerWidth, maxWidth)
  return width - MAZE_HORIZONTAL_MARGIN_PX * 2
}

export const getCellWidth = () => {
  return (getAvailableWidth() - 2 * MAZE_HORIZONTAL_MARGIN_PX) / MAZE_SIZE
}

export const getAspectRatio = () => {
  return getAvailableWidth() / window.innerHeight
}

export const getAvailableSpaceAroundMaze = () => {
  const availableWidth = getAvailableWidth()
  const aspectRatio = getAspectRatio()
  const height = availableWidth / aspectRatio
  return Math.min(height - availableWidth, availableWidth)
}

type DimensionsStore = {
  availableWidth: number
  cellWidth: number
  aspectRatio: number
  availableSpaceAroundMaze: number
  setDimensions: (dimensions: Omit<DimensionsStore, "setDimensions">) => void
}

export const useDimensionsStore = create<DimensionsStore>()((set) => ({
  availableWidth: getAvailableWidth(),
  cellWidth: getCellWidth(),
  aspectRatio: getAspectRatio(),
  availableSpaceAroundMaze: getAvailableSpaceAroundMaze(),
  setDimensions: (dimensions) => set(() => ({ ...dimensions })),
}))

export const useDimensions = (): Omit<DimensionsStore, "setDimensions"> => {
  return useDimensionsStore(
    (state) => ({
      availableWidth: state.availableWidth,
      cellWidth: state.cellWidth,
      aspectRatio: state.aspectRatio,
      availableSpaceAroundMaze: state.availableSpaceAroundMaze,
    }),
    shallow,
  )
}

export const useResponsive = () => {
  const setDimensions = useDimensionsStore((state) => state.setDimensions)

  useEffect(() => {
    const onResize = () => {
      const availableWidth = getAvailableWidth()
      const cellWidth = getCellWidth()
      const aspectRatio = getAspectRatio()
      const availableSpaceAroundMaze = getAvailableSpaceAroundMaze()
      setDimensions({ availableWidth, cellWidth, aspectRatio, availableSpaceAroundMaze })
    }

    window.addEventListener("resize", onResize)
    onResize()

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [setDimensions])
}
