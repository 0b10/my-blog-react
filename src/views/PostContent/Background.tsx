import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useBackgroundStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(6),
    height: "100%",
  },
}));

export default (props: BackgroundProps) => {
  const backgroundClasses = useBackgroundStyles();
  return (
    <Paper classes={backgroundClasses} data-testid="post-content-background">
      {props.children}
    </Paper>
  );
};

export interface BackgroundProps {
  children: JSX.Element | Array<JSX.Element | null> | null;
}
