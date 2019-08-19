import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const dark = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "dark"
    }
  })
);

export const light = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: "light"
    }
  })
);
