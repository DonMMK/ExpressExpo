/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  // Primary colors
  primary: "#007AFF",
  primaryDark: "#0061CC",
  primaryLight: "#4DA3FF",

  // Secondary colors
  secondary: "#5856D6",
  secondaryDark: "#4845B3",
  secondaryLight: "#7A79E2",

  // Accent colors
  accent: "#FF2D55",
  accentDark: "#D41F44",
  accentLight: "#FF5D7D",

  // Neutrals
  background: "#F8F8F8",
  backgroundDark: "#1A1A1A",
  card: "#FFFFFF",
  cardDark: "#2C2C2C",
  text: "#1A1A1A",
  textDark: "#F8F8F8",
  textSecondary: "#6C6C6C",
  textSecondaryDark: "#A0A0A0",
  textTertiary: "#AEAEAE",
  textTertiaryDark: "#666666",
  border: "#E0E0E0",
  borderDark: "#3A3A3A",

  // States
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",

  // Common colors
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  lightGray: "#D1D1D6",
  ultraLightGray: "#F2F2F7",
};
