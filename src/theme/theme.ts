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
    background: {
      light: "#fafafa",
      main: "#eeeeee",
    },
    border: {
      light: "#cfcfcfcf",
      main: "#999999",
    },
  },
  spacing: (factor: number) => `${defaultSpacing * factor}px`,
  ratio: {
    imageInCell: 0.6,
  },
  availableWidthFraction: {
    small: 0.07,
    medium: 0.1,
    large: 0.15,
  },
  typography: {
    h2: {
      font: '"Ranchers", cursive',
    },
  },
} as const

export type UITheme = typeof theme
