import React from "react";
import { Card, CardHeader, CardMedia, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    textTransform: "capitalize"
  }
});

export default (props: IPostProps) => {
  const classes = useStyles();
  return (
    <Card data-testid="post">
      <CardMedia
        component="img"
        height="320"
        image={props.imgUrl}
        data-testid="post-img-url"
        alt={props.imgAltText}
      />
      <CardHeader classes={classes} title={props.title} />
    </Card>
  );
};

interface IPostProps {
  title: string;
  imgUrl: string;
  imgAltText: string;
}
