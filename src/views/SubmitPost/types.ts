import { ValidationSchema } from "./Form";

export type TInitialWidth = "xs" | "sm" | "md" | "lg" | "xl" | undefined;

export interface ISubmitPostProps {
  // for testing. Set width for Hidden component
  initialWidth?: TInitialWidth;
  onSubmit: (...args: any[]) => any;
  validationSchema: ValidationSchema;
}

export interface IPreviewComponentProps {
  children: string;
  headerImageProps: IHeaderImageProps;
  title: string;
  tldr: string;
}

export interface IHeaderImageProps {
  alt: string;
  src?: string;
}
