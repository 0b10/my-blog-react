import React from "react";

import { Box, makeStyles, Typography } from "@material-ui/core";
import { ErrorMessage } from "formik";

import { ISubmitPostInputFields } from "./Form";

export const ValidationMessage = ({ name, testid }: IValidationMessageProps) => {
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
        <ErrorMessage name={name} />
      </Typography>
    </Box>
  );
};

// >>> STYLES >>>
const useTypographyStyles = makeStyles(({ spacing }) => ({
  root: {
    fontWeight: "bold",
    boxSizing: "border-box"
  }
}));

interface IValidationMessageProps {
  name: keyof ISubmitPostInputFields<never>;
  testid?: "body-validation-message" | "title-validation-message" | "tldr-validation-message";
}
