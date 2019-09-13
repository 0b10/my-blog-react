import React, { useCallback, useState } from "react";

import { Box, Grid, Hidden } from "@material-ui/core";

import { Form, TValidationSchema } from "./Form";

// TODO: [#test]- onSubmit

export const withPostPreview = (PreviewComponent: React.FC<IPreviewComponentProps>) => {
  return React.memo(({ initialWidth, onSubmit, validationSchema }: ISubmitPostProps) => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [tldr, setTldr] = useState();

    const handleReset = useCallback(() => {
      setBody("");
      setTitle("");
      setTldr("");
    }, [setBody, setTitle, setTldr]);

    return (
      <div data-testid="submit-post">
        <Grid container direction="row">
          <Grid item xs={12} md={6}>
            <Box mr={1}>
              <Form
                onBodyChange={setBody}
                onReset={handleReset}
                onSubmit={onSubmit}
                onTitleChange={setTitle}
                onTldrChange={setTldr}
                validationSchema={validationSchema}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Hidden smDown initialWidth={initialWidth}>
              <Box ml={1} height="100%">
                <PreviewComponent title={title} tldr={tldr}>
                  {body}
                </PreviewComponent>
              </Box>
            </Hidden>
          </Grid>
        </Grid>
      </div>
    );
  });
};

// >>> INTERFACES >>>
export type TInitialWidth = "xs" | "sm" | "md" | "lg" | "xl" | undefined;

export interface ISubmitPostProps {
  // for testing. Set width for Hidden component
  initialWidth?: TInitialWidth;
  onSubmit: (...args: any[]) => any;
  validationSchema: TValidationSchema;
}

export interface IPreviewComponentProps {
  children: string;
  title: string;
  tldr: string;
}
