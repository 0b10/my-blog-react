import React, { useCallback } from "react";

import { Box, Button, Hidden } from "@material-ui/core";
import { CloudUploadOutlined as UploadIcon, Done as SuccessIcon } from "@material-ui/icons";
import { FormikProps } from "formik";

import { FileAttachmentProps } from "./types";

export const FileAttachment = ({
  accept,
  buttonColor,
  children,
  formik,
  id,
  imageAttached,
  initialWidth,
  name,
  onChange,
  successColor,
  testid,
}: FileAttachmentProps) => {
  const transformFileValues = useCallback(
    // ! Formik doesn't handle file validation. This sets the target field value with the current
    // !  file object - which means file object values can be validated
    (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<any>) => {
      formik.setValues({
        ...formik.values,
        [e.currentTarget.name]: e.currentTarget.files,
      });
    },
    []
  );

  return (
    <>
      <input
        accept={accept}
        data-testid={testid}
        id={id}
        name={name}
        onBlur={(e) => {
          transformFileValues(e, formik);
          formik.handleBlur(e);
        }}
        onChange={(e) => {
          transformFileValues(e, formik);
          formik.handleChange(e);
          onChange(e);
        }}
        style={{ display: "none" }}
        type="file"
      />
      <label htmlFor={id}>
        <Button variant="contained" color={buttonColor} component="span">
          <Hidden xsDown initialWidth={initialWidth}>
            <Box mr={1}>{children}</Box>
          </Hidden>
          {imageAttached ? <SuccessIcon style={{ color: successColor }} /> : <UploadIcon />}
        </Button>
      </label>
    </>
  );
};
