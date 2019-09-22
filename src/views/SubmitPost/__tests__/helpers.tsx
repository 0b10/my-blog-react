import React from "react";

import { render } from "@testing-library/react";

import { PreviewComponentProps, InitialWidth } from "../types";
import { mixed, string, object } from "yup";
import { ValidatedTextFields, ValidationSchema } from "../Form";
import { withPostPreview } from "../";

export const labels = {
  // ! don't use non-regex for matching, use it for info/display purposes only
  body: "Body",
  reBody: /^Body/,
  headerImageAlt: "Header Description",
  reHeaderImgAlt: /^Header Description$/,
  title: "Title",
  reTitle: /^Title/,
  tldr: "TL;DR",
  reTldr: /^TL;DR/,
};

export const elementText = {
  // ! don't use non-regex for matching, use it for info/display purposes only
  // Reset button
  reReset: /^Reset$/,
  reset: "Reset",
  // Submit button
  reSubmit: /^Submit$/,
  submit: "Submit",
  // Attach image button
  attachHeaderImage: "Header",
  reAttachHeaderImage: /^Header$/,
};

export const testids = {
  // The form element
  form: "submit-post-form",
  input: {
    headerImage: "header-image-input",
  },
  // The preview window
  preview: {
    // is divided into sections
    body: "preview-body",
    headerImage: "preview-header-image",
    title: "preview-title",
    tldr: "preview-tldr",
    wrapper: "submit-post-preview", // wraps the entire preview window
  },
  root: "submit-post", // wraps the entire component
  // the validation message box has several testids
  validation: {
    // and this contains the message
    message: {
      // for each section
      all: "validaiton-message", // All of them.. this id is static
      body: "body-validation-message",
      headerImageAlt: "header-image-validation-message",
      headerImgFile: "header-image-validation-message",
      title: "title-validation-message",
      tldr: "tldr-validation-message",
    },
  },
};

export const FakePreview = ({ children, title, tldr, headerImageProps }: PreviewComponentProps) => {
  // ! Any file preview element MUST NOT be rendered until its prop is truthy - e.g. headerImage.
  return (
    <div data-testid={testids.preview.wrapper}>
      {headerImageProps.src ? (
        <img
          src={headerImageProps.src}
          alt={headerImageProps.alt}
          data-testid={testids.preview.headerImage}
        />
      ) : null}
      <div data-testid={testids.preview.title}>{title}</div>
      <div data-testid={testids.preview.tldr}>{tldr}</div>
      <div data-testid={testids.preview.body}>{children}</div>
    </div>
  );
};

export const SubmitPost = withPostPreview(FakePreview);

const requiredMessage = "Required";
export const validationValues = {
  body: {
    min: {
      value: 4,
      message: "Body must be 4 or more chars",
    },
    max: {
      value: 5,
      message: "Body must be 5 or less chars",
    },
    required: {
      message: requiredMessage,
    },
  },
  headerImageAlt: {
    min: {
      value: 10,
      message: "Description must be 10 or more chars",
    },
    max: {
      value: 100,
      message: "Description must be 100 or less chars",
    },
    required: {
      message: requiredMessage,
    },
  },
  headerImage: {
    fileType: {
      value: "image/jpeg",
      message: "Must be a jpeg",
    },
    required: {
      message: "You must attach an image",
    },
  },
  title: {
    min: {
      value: 2,
      message: "Title must be 2 or more chars",
    },
    max: {
      value: 3,
      message: "Title must be 3 or less chars",
    },
    required: {
      message: requiredMessage,
    },
  },
  tldr: {
    min: {
      value: 6,
      message: "Tl;DR must be 6 or more chars",
    },
    max: {
      value: 7,
      message: "TLlDR must be 7 or less chars",
    },
    required: {
      message: requiredMessage,
    },
  },
};

export const defaultValidationSchema: ValidationSchema = object().shape({
  body: string()
    .min(validationValues.body.min.value, validationValues.body.min.message)
    .max(validationValues.body.max.value, validationValues.body.max.message)
    .required(validationValues.body.required.message),
  headerImageAlt: string()
    .min(validationValues.headerImageAlt.min.value, validationValues.headerImageAlt.min.message)
    .max(validationValues.headerImageAlt.max.value, validationValues.headerImageAlt.max.message)
    .required(validationValues.headerImageAlt.required.message),
  headerImage: mixed()
    .required(validationValues.headerImage.required.message)
    .test("fileType", validationValues.headerImage.fileType.message, (value) => {
      // This test only cares about the string value, if it exists - everything else should pass
      if (
        typeof value === "object" &&
        value.length > 0 &&
        value[0].type !== validationValues.headerImage.fileType.value
      ) {
        return false;
      } else {
        return true;
      }
    }),
  title: string()
    .min(validationValues.title.min.value, validationValues.title.min.message)
    .max(validationValues.title.max.value, validationValues.title.max.message)
    .required(validationValues.title.required.message),
  tldr: string()
    .min(validationValues.tldr.min.value, validationValues.tldr.min.message)
    .max(validationValues.tldr.max.value, validationValues.tldr.max.message)
    .required(validationValues.tldr.required.message),
});

export const renderSubmitPost = (
  initialWidth: InitialWidth = "xl",
  validationSchema: ValidationSchema = defaultValidationSchema,
  onSubmit = () => null
) => {
  return render(
    <SubmitPost
      initialWidth={initialWidth}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

/**
 * Get a string that has a length relative to the expected length for that field
 *  (and schema type: min, max..)
 *  This length can be varied with the offset.
 *
 * @param {keyof ValidatedTextFields<void>} field - an input field name
 * @param {"min" | "max"} type - the type of validation - e.g. min, max..
 * @param {number} offset - this is added to the exected length - e.g. min(4) + (-1) would return "aaa" === 3
 * @param {string} str - the repeating sequence to use - typically a char
 * @returns {string} A string that has a length equal to the validation schema expected value for that field,
 *  \+/- the offset value
 * @example // expected min(3) for title:
 * repeatChars("title", "min", -1, "b"); // => "bb"
 */
export const repeatChars = (
  field: keyof ValidatedTextFields<void>,
  type: "min" | "max",
  offset = 0,
  str = "a"
) => {
  const len = validationValues[field][type].value;
  return str.repeat(len + offset);
};
