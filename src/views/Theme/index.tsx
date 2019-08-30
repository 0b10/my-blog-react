import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { getTheme, TThemeName } from "./themes";

export const Theme = (props: IThemeProps) => (
  <ThemeProvider theme={getTheme(props.theme)}>
    <CssBaseline />
    {props.children}
  </ThemeProvider>
);

interface IThemeProps {
  children: JSX.Element | JSX.Element[];
  theme: TThemeName;
}
