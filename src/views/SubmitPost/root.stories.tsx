import React from "react";

import { storiesOf } from "@storybook/react";
import { object, string } from "yup";

import { IPreviewComponentProps, withPostPreview } from "./";

const dummyProps = {
  onSubmit: () => null,
  validationSchema: object().shape({
    title: string()
      .min(3, "Must be 3 or more chars")
      .max(5, "Must be 5 or less chars")
      .required("Required"),
    body: string()
      .min(4, "Must be 4 or more chars")
      .max(6, "Must be 6 or less chars")
      .required("Required"),
    tldr: string()
      .min(5, "Must be 5 or more chars")
      .max(7, "Must be 7 or less chars")
      .required("Required")
  })
};

const FakePreview = ({ children, title, tldr }: IPreviewComponentProps) => (
  <React.Fragment>
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
        border: "1px solid rgba(100, 100, 100, 0.5)"
      }}
    />
  </div>
);
