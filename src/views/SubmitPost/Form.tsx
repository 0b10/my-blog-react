import React, { useCallback, useRef } from "react";

import { Formik } from "formik";
import { Button, ButtonGroup, Grid, makeStyles, TextField } from "@material-ui/core";
import { ObjectSchema, Shape } from "yup";

import { ValidationMessage } from "./ValidationMessage";

// >>> STYLES >>>
const useInputStyles = makeStyles(({ palette }) => ({
  // ! Don't touch "! this", I don't fully understand how they work. They give focused input borders
  // !  a custom colour: https://github.com/mui-org/material-ui/issues/13347#issuecomment-435661221
  cssLabel: {
    // ! this
    "&$cssFocused": {
      color: palette.secondary.main,
    },
  },
  cssOutlinedInput: {
    // ! this
    "&$cssFocused $notchedOutline": {
      borderColor: palette.secondary.main,
    },
  },
  cssFocused: {}, // ! this - appears to be required
  notchedOutline: {}, // ! and this - appears to be required
  inputMultiline: {
    resize: "vertical",
  },
}));

const useTextFieldStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.paper,
  },
}));

// >>> HELPERS >>>
const getInputValue = (ref: React.RefObject<HTMLInputElement>) =>
  ref && ref.current && ref.current.value ? ref.current.value : "";

// >>> COMPONENTS >>>
export const Form = React.memo(
  ({
    onBodyChange,
    onReset,
    onSubmit,
    onTitleChange,
    onTldrChange,
    validationSchema,
  }: IFormProps) => {
    const bodyRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const tldrRef = useRef<HTMLInputElement>(null);

    const handleChange = useCallback(
      (field: keyof ISubmitPostInputFields<never>) => {
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
        }
      },
      [onBodyChange, onTitleChange, onTldrChange]
    );

    return (
      <Formik
        initialValues={{ body: "", title: "", tldr: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        render={(props) => (
          <div data-testid="submit-post-form">
            <form
              onSubmit={props.handleSubmit}
              onReset={() => {
                onReset();
                props.handleReset();
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <InputField
                    error={props.errors.title}
                    id="postSubmitTitle"
                    inputRef={titleRef}
                    label="Title"
                    name="title"
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      props.handleChange(e);
                      handleChange("title");
                    }}
                    value={props.values.title}
                  />
                  <ValidationMessage testid="title-validation-message" name="title" />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    error={props.errors.body}
                    id="postSubmitBody"
                    inputRef={bodyRef}
                    label="Body"
                    name="body"
                    rows={20}
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      props.handleChange(e);
                      handleChange("body");
                    }}
                    value={props.values.body}
                  />
                  <ValidationMessage testid="body-validation-message" name="body" />
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    error={props.errors.tldr}
                    id="postSubmitTldr"
                    inputRef={tldrRef}
                    label="TL;DR"
                    name="tldr"
                    rows={2}
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      props.handleChange(e);
                      handleChange("tldr");
                    }}
                    value={props.values.tldr}
                  />
                  <ValidationMessage testid="tldr-validation-message" name="tldr" />
                </Grid>
              </Grid>
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

const InputField = React.memo(
  ({ error, id, inputRef, label, name, onBlur, onChange, rows, value }: IInputFieldProps) => {
    const textFieldClasses = useTextFieldStyles();
    const inputClasses = useInputStyles();

    // FIXME: useRef for classes
    return (
      <TextField
        classes={textFieldClasses}
        error={error ? true : false}
        fullWidth
        id={id}
        inputRef={inputRef}
        InputLabelProps={{
          classes: {
            root: inputClasses.cssLabel,
            focused: inputClasses.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: inputClasses.cssOutlinedInput,
            focused: inputClasses.cssFocused,
            notchedOutline: inputClasses.notchedOutline,
            inputMultiline: inputClasses.inputMultiline,
          },
        }}
        label={label}
        margin="none"
        multiline={rows !== undefined ? true : false}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        rows={rows}
        value={value}
        variant="outlined"
      />
    );
  }
);

// >>> INTERFACES >>>
interface IFormProps {
  onBodyChange: (val: string) => void;
  onReset: () => void;
  onSubmit: (...args: any[]) => any; // FIXME: narrow type
  onTitleChange: (val: string) => void;
  onTldrChange: (val: string) => void;
  validationSchema: TValidationSchema;
}

interface IInputFieldProps {
  error?: boolean | string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  label: string;
  name: keyof ISubmitPostInputFields<never>;
  onBlur: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  rows?: number;
  value: string;
}

// Use this for everything, including tests
export interface ISubmitPostInputFields<T> {
  body: T;
  title: T;
  tldr: T;
}

export type TValidationSchema = ObjectSchema<Shape<object, ISubmitPostInputFields<string>>>;
