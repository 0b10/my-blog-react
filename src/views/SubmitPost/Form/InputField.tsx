import React from "react";

import { TextField } from "@material-ui/core";

import { InputFieldProps } from "./types";
import { useInputStyles, useTextFieldStyles } from "./styles";

export const InputField = React.memo(
  ({
    error,
    id,
    InputProps,
    inputRef,
    label,
    name,
    onBlur,
    onChange,
    rows,
    value,
  }: InputFieldProps) => {
    const textFieldClasses = useTextFieldStyles();
    const inputClasses = useInputStyles();

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
          ...InputProps,
          classes: {
            root: inputClasses.cssOutlinedInput,
            focused: inputClasses.cssFocused,
            notchedOutline: inputClasses.notchedOutline,
            inputMultiline: inputClasses.inputMultiline,
          },
        }}
        label={label}
        margin="none"
        multiline={rows !== undefined && rows >= 1 ? true : false}
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
