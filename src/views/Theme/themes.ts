import _ from "lodash";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Shadows } from "@material-ui/core/styles/shadows";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

import { ThemeError } from "./error";

// >>> HELPERS >>>
/**
 * Make an array of shadow css rules. Each index in the array maps to the blur radius of the shadow
 *
 * @param {number} alpha - set the alpha of the shadow
 * @returns {Array<string|number>} An array of CSS properties relating to shadows, with the first index
 *  being "none".
 * @example makeShadows(0.5) // => ["none", "0px 8px 1px -1px rgba(0,0,0,0.5", ...]
 */
const makeShadows = (alpha: number) =>
  [
    "none",
    ..._.range(0, 24).map((blur) => `0px 8px ${blur}px -1px rgba(0,0,0,${alpha})`),
  ] as Shadows;

// >>> THEMES >>>
const dark: ThemeOptions = {
  palette: {
    type: "dark",
    common: { black: "#000", white: "#fff" },
    background: { paper: "rgba(22, 22, 22, 1)", default: "rgba(7, 7, 7, 1)" },
    primary: {
      light: "rgba(55, 62, 168, 1)",
      main: "rgba(35, 43, 160, 1)",
      dark: "rgba(23, 28, 102, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(151, 46, 200, 1)",
      main: "rgba(128, 0, 188, 1)",
      dark: "rgba(105, 0, 154, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "rgba(236, 61, 61, 1)",
      main: "rgba(232, 18, 18, 1)",
      dark: "rgba(168, 0, 0, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.54)",
      disabled: "rgba(163, 163, 163, 0.57)",
      hint: "rgba(122, 122, 122, 0.38)",
    },
  },
  shadows: makeShadows(0.85),
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
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(159, 105, 188, 1)",
      main: "rgba(140, 59, 177, 1)",
      dark: "rgba(93, 23, 130, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "rgba(255, 108, 108, 1)",
      main: "rgba(255, 50, 50, 1)",
      dark: "rgba(212, 19, 19, 1)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(3, 126, 214, 1)",
      disabled: "rgba(3, 126, 214, 0.69)",
      hint: "rgba(92, 175, 236, 1)",
    },
  },
  shadows: makeShadows(0.65),
};

// >>> EXPORTS >>>
// TODO: [#test,#theme]
export const getTheme = (name: ThemeName) => {
  let theme: any;
  switch (name) {
    case "light":
      theme = light;
      break;
    case "dark":
      theme = dark;
      break;
    default:
      throw new ThemeError(`Invalid theme name: "${name}"`);
  }
  return responsiveFontSizes(createMuiTheme(theme)); // avoid using [key]
};

// >>> TYPES >>>
export type ThemeName = "dark" | "light";

// Use this to guide tests
export type ThemeNames<T> = Record<ThemeName, T>;
