import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const withTitleStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
  },
}));

export default (props: TitleProps) => {
  const titleClasses = withTitleStyles();
  return (
    <Typography classes={titleClasses} variant="h1" data-testid="post-title">
      {props.children}
    </Typography>
  );
};

interface TitleProps {
  children: string;
}
