import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

export default (props: IHeadingProps) => {
  const headingClasses = withHeadingStyles();
  return (
    <Typography classes={headingClasses} variant="h1" data-testid="post-heading-h1">
      {props.children}
    </Typography>
  );
};

const withHeadingStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(4)
  }
}));

interface IHeadingProps {
  children: string;
}
