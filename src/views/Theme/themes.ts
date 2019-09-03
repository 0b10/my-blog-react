import _ from "lodash";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Shadows } from "@material-ui/core/styles/shadows";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

// >>> HELPERS >>>
/**
 * Make an array of shadow css rules. Each index in the array maps to the blur radius of the shadow.
 * @param alpha - set the alpha of the shadow
 * @returns An array of CSS properties relating to shadows
 * @example makeShadows(0.5) // => ["none", "0px 8px 1px -1px rgba(0,0,0,0.5", ...]
 */
const makeShadows = (alpha: number) =>
  ["none", ..._.range(0, 24).map(blur => `0px 8px ${blur}px -1px rgba(0,0,0,${alpha})`)] as Shadows;

// >>> THEMES >>>
const dark: ThemeOptions = {
  palette: {
    type: "dark",
    background: { paper: "rgba(34, 34, 34, 1)", default: "rgba(17, 17, 17, 1)" },
    primary: {
      light: "#7986cb",
      main: "rgba(28, 63, 255, 1)",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(196, 57, 223, 1)",
      main: "rgba(189, 16, 224, 1)",
      dark: "rgba(147, 14, 174, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "rgba(255, 68, 68, 1)",
      main: "rgba(255, 0, 0, 1)",
      dark: "rgba(197, 0, 0, 1)",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.92)",
      secondary: "rgba(255, 255, 255, 0.35)",
      disabled: "rgba(109, 109, 109, 0.47)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  shadows: makeShadows(0.85)
};

const light: ThemeOptions = {
  palette: {
    type: "light",
    common: { black: "rgba(0, 0, 0, 1)", white: "#fff" },
    background: { paper: "rgba(255, 255, 255, 1)", default: "rgba(230, 230, 230, 1)" },
    primary: {
      light: "rgba(92, 153, 195, 1)",
      main: "rgba(36, 128, 194, 1)",
      dark: "rgba(22, 84, 127, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(159, 105, 188, 1)",
      main: "rgba(140, 59, 177, 1)",
      dark: "rgba(93, 23, 130, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "rgba(255, 108, 108, 1)",
      main: "rgba(255, 50, 50, 1)",
      dark: "rgba(212, 19, 19, 1)",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(3, 126, 214, 1)",
      disabled: "rgba(3, 126, 214, 0.69)",
      hint: "rgba(92, 175, 236, 1)"
    }
  },
  shadows: makeShadows(0.65)
};

// ! Don't forget to update me when adding a theme
const theme = { dark, light };

// >>> EXPORTS >>>
export const getTheme = (name: TThemeName) => responsiveFontSizes(createMuiTheme(theme[name]));

// >>> TYPES >>>
export type TThemeName = "dark" | "light";
