import { Platform } from "react-native";

export const Colors = {
  // Base
  primary: "#0686FC",
  black: "#1E1E1E",
  white: "#FFFFFF",

  // Accents
  banana: "#F8FE83",
  blueberry: "#37B8F0",
  cherry: "#E31A3E",
  watermelon: "#5BF5A3",

  // Text
  text: "#131313",
  textPlaceholder: "#777777",

  // System
  success: "#5BF5A3",
  error: "#E31A3E",
  warning: "#3434FF",

  // Custom Grays
  gray100: "#D9E7EF", // bright was cfdbe5
  gray200: "#A4B9CB",
  gray300: "#7E99B2",
  gray400: "#5D7C98",
  gray500: "#41627F",
  gray600: "#2A4965",
  gray700: "#18334C",
  gray800: "#0B2033",
  gray900: "#030F19" // dark
};

export const Sizes = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 40,
  10: 64
};

export const Grid = {
  gutter_width: Sizes[5]
};

export const Corners = {
  regular: 5,
  loose: Sizes[6]
};

export const Shadow = {
  default: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  }
};

export const Fonts = {
  Regular: "Outfit_400Regular",
  Bold: "Outfit_700Bold"
};
