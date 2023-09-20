import { useEffect } from "react"
import useSound from "use-sound"
import { create } from "zustand"
import backgroundMusicFile from "../assets/sounds/background.mp3"

type BackgroundMusic = {
  play: () => void
  stop: () => void
  mute: () => void
  unmute: () => void
}

type SoundsStore = {
  backgroundMusic: BackgroundMusic | null
  setBackgroundMusic: (backgroundMusic: BackgroundMusic | null) => void
  muteBackgroundMusic: () => void
  unmuteBackgroundMusic: () => void
}

export const useSoundsStore = create<SoundsStore>()((set, get) => ({
  backgroundMusic: null,
  setBackgroundMusic: (backgroundMusic) => set(() => ({ backgroundMusic })),
  muteBackgroundMusic: () => {
    const music = get().backgroundMusic
    if (!music) {
      return
    }
    music.mute()
  },
  unmuteBackgroundMusic: () => {
    const music = get().backgroundMusic
    if (!music) {
      return
    }
    music.unmute()
  },
}))

const useSetBackgroundMusic = () => useSoundsStore((state) => state.setBackgroundMusic)
export const useBackgroundMusicControls = () => useSoundsStore((state) => state.backgroundMusic)
export const useMuteBackgroundMusic = () => useSoundsStore((state) => state.muteBackgroundMusic)
export const useUnmuteBackgroundMusic = () => useSoundsStore((state) => state.unmuteBackgroundMusic)

export const useBackgroundMusic = () => {
  const setBackgroundMusic = useSetBackgroundMusic()
  const [play, { stop, sound }] = useSound(backgroundMusicFile, {
    loop: true,
    volume: 0.7,
  })

  useEffect(() => {
    play()
    setBackgroundMusic({ play, stop, mute: () => sound?.mute(true), unmute: () => sound?.mute(false) })

    return () => {
      stop()
      setBackgroundMusic(null)
    }
  }, [play, stop, sound, setBackgroundMusic])
}
