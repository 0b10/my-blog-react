import React, { useCallback, useState } from "react";

import { Box, Grid, Hidden } from "@material-ui/core";

import { Form } from "./Form";
import { HeaderImageProps, PreviewComponentProps, SubmitPostProps } from "./types";

// TODO: [#test]- onSubmit

export const withPostPreview = (PreviewComponent: React.FC<PreviewComponentProps>) => {
  return React.memo(({ initialWidth, onSubmit, validationSchema }: SubmitPostProps) => {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [tldr, setTldr] = useState();
    const [headerImageProps, setHeaderImageProps] = useState<HeaderImageProps>({
      src: "",
      alt: "",
    });

    const handleReset = useCallback(() => {
      setBody("");
      setTitle("");
      setTldr("");
      setHeaderImageProps({ src: "", alt: "" });
    }, [setBody, setTitle, setTldr]);

    return (
      <div data-testid="submit-post">
        <Grid container direction="row">
          <Grid item xs={12} md={6}>
            <Box mr={1}>
              <Form
                initialWidth={initialWidth}
                onBodyChange={setBody}
                onHeaderImageAltChange={(newState) =>
                  setHeaderImageProps((prevState) => ({ ...prevState, ...newState }))
                }
                onHeaderImageChange={setHeaderImageProps}
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
                <PreviewComponent headerImageProps={headerImageProps} title={title} tldr={tldr}>
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
