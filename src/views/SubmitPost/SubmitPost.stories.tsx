/* eslint-disable no-undef */
import React from "react";

import { action } from "@storybook/addon-actions";
import { jsxDecorator } from "storybook-addon-jsx";
import { mixed, object, string } from "yup";
import { storiesOf } from "@storybook/react";

import { PreviewComponentProps } from "./types";
import { withPostPreview } from ".";

const dummyProps = {
  onSubmit: () => null,
  validationSchema: object().shape({
    title: string()
      .min(3, "Must be 3 or more chars")
      .max(5, "Must be 5 or less chars")
      .required("Required"),
    headerImageAlt: string()
      .min(5, "Must be 5 or more chars")
      .max(10, "Must be 10 or less chars")
      .required("You must include a description"),
    headerImage: mixed()
      .required("You must attach an image")
      .test("format", "The image must be a png", (value) => {
        // This test only cares about the string value, if it exists - everything else should pass
        if (typeof value === "object" && value.length > 0 && value[0].type === "image/png") {
          return true;
        }
        return false;
      }),
    body: string()
      .min(4, "Must be 4 or more chars")
      .max(6, "Must be 6 or less chars")
      .required("Required"),
    tldr: string()
      .min(5, "Must be 5 or more chars")
      .max(7, "Must be 7 or less chars")
      .required("Required"),
  }),
};

const submitPostNotes = `The preview component here is a stub, and does not represent the final product.`;

const FakePreview = ({ children, headerImageProps, title, tldr }: PreviewComponentProps) => (
  <React.Fragment>
    <img
      {...headerImageProps}
      style={{ height: "200px", width: "100%", objectFit: "cover", backgroundColor: "#EEE" }}
    />
    <h2>{title}</h2>
    <p>{tldr}</p>
    <p>{children}</p>
  </React.Fragment>
);
const SubmitPost = withPostPreview(FakePreview);

storiesOf("SubmitPost", module)
  .addDecorator(jsxDecorator)
  .add("default", () => <SubmitPost {...dummyProps} onSubmit={action("Submitting post...")} />, {
    notes: submitPostNotes,
    // BUG: storybookjs/addon-jsx#89 - function body is not hidden when displayName is used
    jsx: { showFunctions: false, displayName: "SubmitPost" },
  });
