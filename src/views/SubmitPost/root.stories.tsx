/* eslint-disable no-undef */
import React from "react";

import { storiesOf } from "@storybook/react";
import { mixed, object, string } from "yup";

import { PreviewComponentProps } from "./types";
import { withPostPreview } from "./";

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
  .add("default", () => {
    return (
      <div style={{ padding: "20px" }}>
        <p>The preview component here is a stub, and does not represent the final product.</p>
        <Divider />
        <SubmitPost {...dummyProps} />
      </div>
    );
  })
  .add("invalid title", () => {
    return (
      <div style={{ padding: "20px" }}>
        <p>Type anything into any of the fields.</p>
        <p>
          Note that the validator in this story returns a validation message for all fields. Because
          the logic validates all fields simultaneously, a message will appear in all fields -
          obviously if the field was valid, a message would not appear.
        </p>
        <Divider />
        <SubmitPost {...dummyProps} />
      </div>
    );
  });

const Divider = () => (
  <div>
    <hr
      style={{
        margin: "40px",
        border: "1px solid rgba(100, 100, 100, 0.5)",
      }}
    />
  </div>
);
