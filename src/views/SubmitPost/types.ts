import { ValidationSchema } from "./Form";

export type InitialWidth = "xs" | "sm" | "md" | "lg" | "xl" | undefined;

export interface SubmitPostProps {
  // for testing. Set width for Hidden component
  initialWidth?: InitialWidth;
  onSubmit: (...args: any[]) => any;
  validationSchema: ValidationSchema;
}

export interface PreviewComponentProps {
  children: string;
  headerImageProps: HeaderImageProps;
  title: string;
  tldr: string;
}

export interface HeaderImageProps {
  alt: string;
  src?: string;
}
