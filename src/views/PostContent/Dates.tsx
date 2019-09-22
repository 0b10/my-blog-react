import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default React.memo((props: DatesProps) => {
  let datesString = `Created at: ${props.createdAt}`;
  if (props.modifiedAt !== props.createdAt) {
    datesString = datesString + `; Modified at: ${props.modifiedAt}`;
  }

  return (
    <Grid container direction="row" justify="flex-end">
      <Grid item>
        <Typography
          variant="subtitle2"
          color="textSecondary"
          gutterBottom
          component="span"
          data-testid="article-dates"
        >
          {datesString}
        </Typography>
      </Grid>
    </Grid>
  );
});

export interface DatesProps {
  createdAt: string;
  modifiedAt: string;
}
