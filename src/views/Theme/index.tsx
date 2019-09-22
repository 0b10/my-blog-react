import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import { getTheme, ThemeName } from "./themes";

export const Theme = (props: ThemeProps) => (
  <ThemeProvider theme={getTheme(props.theme)}>
    <CssBaseline />
    {props.children}
  </ThemeProvider>
);

interface ThemeProps {
  children: JSX.Element | JSX.Element[];
  theme: ThemeName;
}
