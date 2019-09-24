import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useGridStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: spacing(2),
  },
}));

export const Container = (props: PostsContainerProps) => {
  const gridClasses = useGridStyles();
  return (
    <Grid classes={gridClasses} container spacing={4}>
      {props.children}
    </Grid>
  );
};

interface PostsContainerProps {
  children: React.ReactElement | React.ReactElement[];
}
