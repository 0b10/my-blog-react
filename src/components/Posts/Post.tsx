import React from "react";
import { Card, CardHeader, CardMedia, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    textTransform: "capitalize"
  }
});

export default (props: IPostProps) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
    </Grid>
  );
};

interface IPostProps {
  title: string;
  imgUrl: string;
  imgAltText: string;
}
