import React from "react";
import { Grid } from "@material-ui/core";

export default (props: IPostsContainerProps) => {
  return (
    <Grid container spacing={4}>
      {props.children}
    </Grid>
  );
};

interface IPostsContainerProps {
  children: React.ReactElement | React.ReactElement[];
}
