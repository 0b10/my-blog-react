import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

export default (props: IPostsContainerProps) => {
  const gridClasses = useGridStyles();
  return (
    <Grid classes={gridClasses} container spacing={4}>
      {props.children}
    </Grid>
  );
};

const useGridStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: spacing(2)
  }
}));

interface IPostsContainerProps {
  children: React.ReactElement | React.ReactElement[];
}
