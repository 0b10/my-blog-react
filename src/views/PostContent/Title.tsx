import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

export default (props: ITitleProps) => {
  const titleClasses = withTitleStyles();
  return (
    <Typography classes={titleClasses} variant="h1" data-testid="post-title">
      {props.children}
    </Typography>
  );
};

const withTitleStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(4)
  }
}));

interface ITitleProps {
  children: string;
}
