import React, { ChangeEvent, useCallback, useRef, useState } from "react";

import { Button, ButtonGroup, Grid, InputAdornment } from "@material-ui/core";
import { Formik } from "formik";

import { FileAttachment } from "./FileAttachment";
import { FormProps, TextFields, TextFieldGroupProps } from "./types";
import { InputField } from "./InputField";
import { ValidationMessage } from "./ValidationMessage";

// >>> HELPERS >>>
const getInputValue = (ref: React.RefObject<HTMLInputElement>) =>
  ref && ref.current && ref.current.value ? ref.current.value : "";

// >>> COMPONENTS >>>
export const Form = React.memo(
  ({
    initialWidth,
    onBodyChange,
    onHeaderImageAltChange,
    onHeaderImageChange,
    onReset,
    onSubmit,
    onTitleChange,
    onTldrChange,
    validationSchema,
  }: FormProps) => {
    const bodyRef = useRef<HTMLInputElement>(null);
    const headerImageAltRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const tldrRef = useRef<HTMLInputElement>(null);

    const [imageAttached, setImageAttached] = useState(false);

    const handleChange = useCallback(
      (field: keyof TextFields<void>) => {
        switch (field) {
          case "title":
            onTitleChange(getInputValue(titleRef));
            break;
          case "tldr":
            onTldrChange(getInputValue(tldrRef));
            break;
          case "body":
            onBodyChange(getInputValue(bodyRef));
            break;
          case "headerImageAlt":
            onHeaderImageAltChange(Object.freeze({ alt: getInputValue(headerImageAltRef) }));
            break;
        }
      },
      [onBodyChange, onHeaderImageAltChange, onTitleChange, onTldrChange]
    );

    const handleHeaderImageChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
          setImageAttached(true);
          const reader = new FileReader();
          reader.onload = () => {
            // ! e.target.result doesn't compile - "doesn't exist", use reader.result instead
            if (reader.result) {
              onHeaderImageChange({
                src: reader.result as string,
                alt: getInputValue(headerImageAltRef),
              });
            }
          };
          reader.readAsDataURL(files[0]);
        }
      },
      [onHeaderImageChange]
    );

    // The varying props of contiguous (positionally close) input text fields
    const textFieldGroupProps = useRef<Readonly<TextFieldGroupProps[]>>(
      Object.freeze([
        {
          name: "title",
          id: "postSubmitTitle",
          inputRef: titleRef,
          label: "Title",
        },
        {
          name: "body",
          id: "postSubmitBody",
          inputRef: bodyRef,
          label: "Body",
          rows: 20,
        },
        {
          name: "tldr",
          id: "postSubmitTldr",
          inputRef: tldrRef,
          label: "TL;DR",
          rows: 2,
        },
      ])
    );

    return (
      <Formik
        initialValues={{
          body: "",
          headerImage: undefined,
          headerImageAlt: "",
          title: "",
          tldr: "",
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={(formikProps) => (
          <div data-testid="submit-post-form">
            <form
              onSubmit={formikProps.handleSubmit}
              onReset={() => {
                onReset();
                setImageAttached(false);
                formikProps.handleReset();
              }}
            >
              <Grid container>
                {
                  // ~~~ Text Fields ~~~
                }
                {textFieldGroupProps.current.map(
                  ({ name, id, inputRef, label, rows }: TextFieldGroupProps, index) => (
                    <Grid item xs={12} key={index}>
                      <InputField
                        error={formikProps.touched[name] && formikProps.errors[name]} // eslint-disable-line security/detect-object-injection
                        id={id}
                        inputRef={inputRef}
                        label={label}
                        name={name}
                        onBlur={formikProps.handleBlur}
                        onChange={(e) => {
                          formikProps.handleChange(e);
                          handleChange(name);
                        }}
                        rows={rows}
                        value={formikProps.values[name]} // eslint-disable-line security/detect-object-injection
                      />
                      <ValidationMessage
                        testid={`${name}-validation-message` as "title-validation-message"} // The providing array ensures type
                        name={`${name}` as "title"} // The providing array ensures type
                      />
                    </Grid>
                  )
                )}
                {
                  // ~~~ Header Image Input ~~~
                }
                <Grid item xs={12}>
                  <InputField
                    error={
                      (formikProps.touched.headerImageAlt || formikProps.touched.headerImage) &&
                      (formikProps.errors.headerImageAlt || formikProps.errors.headerImage)
                    }
                    id="postSubmitHeaderImageAlt"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <FileAttachment
                            accept="image/*"
                            buttonColor="secondary"
                            formik={formikProps}
                            id="headerImageAttach"
                            imageAttached={imageAttached}
                            initialWidth={initialWidth}
                            name="headerImage"
                            onChange={handleHeaderImageChange}
                            successColor="#0F0"
                            testid="header-image-input"
                          >
                            Header
                          </FileAttachment>
                        </InputAdornment>
                      ),
                    }}
                    inputRef={headerImageAltRef}
                    label="Header Description"
                    name="headerImageAlt"
                    onBlur={formikProps.handleBlur}
                    onChange={(e) => {
                      handleChange("headerImageAlt");
                      formikProps.handleChange(e);
                    }}
                    value={formikProps.values.headerImageAlt}
                  />
                  <ValidationMessage testid="header-image-validation-message">
                    {formikProps.touched.headerImageAlt && formikProps.errors.headerImageAlt && (
                      <span style={{ display: "block" }}>{formikProps.errors.headerImageAlt}</span>
                    )}
                    {formikProps.touched.headerImage && formikProps.errors.headerImage && (
                      <span style={{ display: "block" }}>{formikProps.errors.headerImage}</span>
                    )}
                  </ValidationMessage>
                </Grid>
              </Grid>
              {
                // ~~~ Buttons ~~~
              }
              <ButtonGroup fullWidth color="secondary">
                <Button type="reset" variant="outlined">
                  Reset
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </ButtonGroup>
            </form>
          </div>
        )}
      />
    );
  }
);

export * from "./types";
