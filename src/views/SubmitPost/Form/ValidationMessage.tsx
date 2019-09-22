import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";
import { ErrorMessage } from "formik";

import { ValidationMessageProps } from "./types";

const useTypographyStyles = makeStyles({
  root: {
    fontWeight: "bold",
    boxSizing: "border-box",
  },
});

export const ValidationMessage = ({ name, testid, children }: ValidationMessageProps) => {
  const typographyClasses = useTypographyStyles();
  return (
    <Box style={{ boxSizing: "border-box" }} p={1} height={60} data-testid={testid}>
      <Typography
        classes={typographyClasses}
        color="error"
        component="span"
        data-testid="validaiton-message"
        variant="body2"
      >
        {children ? (
          children
        ) : name ? (
          <ErrorMessage name={name as string} />
        ) : (
          new Error(
            "You must provide a name attribute to ValidationMessage if you're not providing 'children'"
          )
        )}
      </Typography>
    </Box>
  );
};
