import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

export default (props: IPostContentBackgroundProps) => {
  const backgroundClasses = useBackgroundStyles();
  return (
    <Paper classes={backgroundClasses} data-testid="post-content-background">
      {props.children}
    </Paper>
  );
};

const useBackgroundStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(6)
  }
}));

export interface IPostContentBackgroundProps {
  children: JSX.Element | JSX.Element[];
}
