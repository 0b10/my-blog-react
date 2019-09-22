import { makeStyles } from "@material-ui/core";

export const useInputStyles = makeStyles(({ palette }) => ({
  // ! Don't touch "! this", I don't fully understand how they work. They give focused input borders
  // !  a custom colour: https://github.com/mui-org/material-ui/issues/13347#issuecomment-435661221
  cssLabel: {
    // ! this
    "&$cssFocused": {
      color: palette.secondary.main,
    },
  },
  cssOutlinedInput: {
    // ! this
    "&$cssFocused $notchedOutline": {
      borderColor: palette.secondary.main,
    },
  },
  cssFocused: {}, // ! this - appears to be required
  notchedOutline: {}, // ! and this - appears to be required
  inputMultiline: {
    resize: "vertical",
  },
}));

export const useTextFieldStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.paper,
  },
}));
