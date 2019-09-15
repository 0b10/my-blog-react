import { makeStyles } from "@material-ui/core";

export const elevationDepth = 8; // For Box and Paper
export const marginSpacing = 2; // margin between root container and top level elements - images, block quotes etc.

// >>>  Block Quote >>>
export const useBlockQuoteStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    fontStyle: "italic",
    textAlign: "justify",
  },
}));

export const useBlockQuoteTextStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
  },
}));

// >>> Code >>>
export const useCodeMountStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1), // The code icon takes up some of this space
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    margin: theme.spacing(marginSpacing),
  },
}));

export const useInlineCodeStyles = makeStyles((theme) => ({
  text: {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    fontFamily: "monospace, monospace !important",
  },
}));

// >>> Divider >>>
export const useDividerStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

// >>> Images >>>
export const useImageWrapperStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(marginSpacing),
  },
}));

export const useImgStyles = makeStyles({
  root: {
    display: "block",
    maxWidth: "100%",
  },
});

// >>> Table >>>
export const useTableStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: "collapse",
    color: theme.palette.text.primary,
  },
}));

export const useTableCellStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderCollapse: "collapse",
    padding: theme.spacing(2),
  },
}));

export const useTableHeaderStyles = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.getContrastText(theme.palette.secondary.dark),
  },
}));

// >>> Header >>>
export const useHeaderStyles = makeStyles((theme) => ({
  root: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
