import { FormikProps } from "formik";
import { ObjectSchema, Shape } from "yup";

import { HeaderImageProps, InitialWidth } from "../types";

// >>> COMPONENT PROPS >>>
/**
 * The input props for the Form component
 */
export interface FormProps {
  initialWidth?: InitialWidth;
  onBodyChange: (val: string) => void;
  onHeaderImageAltChange: (attributes: Readonly<{ alt: string }>) => void;
  onHeaderImageChange: (props: HeaderImageProps) => void;
  onReset: () => void;
  onSubmit: (...args: any[]) => any; // FIXME: narrow type
  onTitleChange: (val: string) => void;
  onTldrChange: (val: string) => void;
  validationSchema: ValidationSchema;
}

/**
 * The input props of the InputField component
 */
export interface InputFieldProps {
  error?: boolean | string; // display error border
  fullWidth?: boolean; // 100% width
  id: string; // doesn't matter, make it anything - but unique per document
  InputProps?: object; // mui Input field props - see TextField API
  inputRef?: React.RefObject<HTMLInputElement>; // the input element ref
  label: string; // form label
  name: keyof TextFields<void> | keyof FileAttachmentButtons<void>; // used for formik validation
  onBlur: (e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  rows?: number; // text field rows. undefined is 1
  value: string; // the input value attribute
}

/**
 * The input props for the file attachment button component.
 */
export interface FileAttachmentProps {
  accept: string; // input accept: e.g. images/* or images/jpeg
  buttonColor: "inherit" | "primary" | "secondary" | "default" | undefined; // mui color prop
  children: string; // display text
  formik: FormikProps<any>; // a formik object injected into the render() method
  id: string; // attached to attached to <input />, make it unique per document
  imageAttached: boolean; // displays a tick if true
  initialWidth?: InitialWidth; // for testing, set xl to make visible at all times
  name: keyof FileAttachmentButtons<void>; // Used for formik validation
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  successColor: string; // The color of the tick
  testid: string; // data-testid attached to <input />
}

// >>> MISC >>>
/**
 * The varying input props for contiguous input text fields in Form. These elements are positionally
 * close together, and are "mapped".
 */
export interface TextFieldGroupProps {
  id: "postSubmitTitle" | "postSubmitBody" | "postSubmitTldr";
  inputRef: React.RefObject<HTMLInputElement>; // used to extract values
  label: "Title" | "TL;DR" | "Body"; // The display text
  name: "title" | "tldr" | "body"; // for formik validation
  rows?: number; // number of textfield rows
}

export interface ValidationMessageProps {
  children?: any;
  name?: keyof TextFields<void> | keyof FileAttachmentButtons<void>;
  testid:
    | "body-validation-message"
    | "title-validation-message"
    | "tldr-validation-message"
    | "header-image-validation-message";
}

export type ValidationSchema = ObjectSchema<Shape<object, ValidatedFields<string>>>;

// >>> TESTING >>>
// These are mostly used for keeping test data up to date, but some keys are used to constrain prop
//  values in production code.

// ~~~ Fields ~~~
// All input text fields
export type TextFields<T> = {
  body: T;
  headerImageAlt: T;
  title: T;
  tldr: T;
};

// All buttons capable of attaching a file/uploading, these buttons don't need to have any other
//  special function.
export interface FileAttachmentButtons<T> {
  headerImage: T;
}

// ~~~ Validated Fields ~~~
// Any, and all fields that are validated - text fields, input files etc.
export type ValidatedFields<T> = ValidatedTextFields<T> & ValidatedButtons<T>;

// Input text fields that are validated
export type ValidatedTextFields<T> = Pick<
  TextFields<T>,
  "body" | "headerImageAlt" | "title" | "tldr"
>;

// Any buttons that are validated, and produces validation messages.
export type ValidatedButtons<T> = Pick<FileAttachmentButtons<T>, "headerImage">;

// ~~~ Previewed Fields ~~~
// Input text fields whose values appear in the preview component.
export interface PreviewedTextFields<T> {
  body: T;
  title: T;
  tldr: T;
}

// All attached files that appear in the preview component
export type PreviewedAttachments<T> = Pick<FileAttachmentButtons<T>, "headerImage">;

// All attached images
export type PreviewedImages<T> = Pick<FileAttachmentButtons<T>, "headerImage">;
