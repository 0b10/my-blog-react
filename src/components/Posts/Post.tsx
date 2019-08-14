import React from "react";
import { Card, CardHeader, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    textTransform: "capitalize"
  }
});

export default (props: IPostProps) => {
  const classes = useStyles();
  return (
    <Card data-testid="post">
      <CardHeader classes={classes} title={props.title} />
    </Card>
  );
};

interface IPostProps {
  title: string;
}
