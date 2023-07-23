const defaultSpacing = 8

export const theme = {
  palette: {
    primary: {
      dark: "#0059B2",
      light: "#66B2FF",
      main: "#3399FF",
    },
    secondary: {
      dark: "#ab47bc",
      light: "#f3e5f5",
      main: "#ce93d8",
    },
  },
  spacing: (factor: number) => `${defaultSpacing * factor}px`,
} as const

export type UITheme = typeof theme
