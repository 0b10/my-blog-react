/* eslint-disable @typescript-eslint/ban-ts-ignore, jsdoc/require-jsdoc */
import React from "react";

import { Box, Divider, Grid, Link, Paper, Typography, useTheme } from "@material-ui/core";
import { Code as CodeIcon, FormatQuote as ParenthesesIcon } from "@material-ui/icons";
import SyntaxHiglighter from "react-syntax-highlighter";
// @ts-ignore
import { xt256 as syntaxTheme } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import {
  elevationDepth,
  useBlockQuoteStyles,
  useBlockQuoteTextStyles,
  useDividerStyles,
  useHeaderStyles,
  useImageWrapperStyles,
  useImgStyles,
  useTableCellStyles,
  useTableHeaderStyles,
  useTableStyles,
  useCodeMountStyles,
  useInlineCodeStyles,
} from "./styles";

import {
  ICodeRendererProps,
  IHeadingRendererProps,
  IImgRendererProps,
  ILinkRendererProps,
  IListRendererProps,
  IRendererProps,
} from "./interfaces";

// ~~~ Code ~~~
export function CodeRenderer(props: ICodeRendererProps) {
  const codeMountClasses = useCodeMountStyles();
  const theme = useTheme();
  return props.value ? ( // value can be undefined, when activated with ``` and no value.
    <Paper classes={codeMountClasses} elevation={elevationDepth}>
      <React.Fragment>
        <CodeIcon />
        <SyntaxHiglighter
          language={props.language}
          style={syntaxTheme}
          customStyle={{
            padding: theme.spacing(3),
            margin: "0px",
            borderRadius: theme.shape.borderRadius,
          }}
          showLineNumbers
          data-testid="markdown-code"
        >
          {props.value}
        </SyntaxHiglighter>
      </React.Fragment>
    </Paper>
  ) : null;
}

// ~~~ Paragraph ~~
export const ParagraphRenderer = (props: IRendererProps) => {
  return (
    <Typography variant="body1" data-testid="markdown-paragraph">
      {props.children}
    </Typography>
  );
};

// ~~~ Headers ~~~
export function HeadingRenderer(props: IHeadingRendererProps) {
  const headerClasses = useHeaderStyles();
  const level = props.level + 1; // h1 is for post title
  const headerTestId = `markdown-header-level-${props.level}`;

  return props.level < 6 ? ( // will render only h2-h6
    <Typography classes={headerClasses} variant={`h${level}` as "h1"} data-testid={headerTestId}>
      {props.children}
    </Typography>
  ) : (
    // will render span for level 6
    <Typography
      classes={headerClasses}
      variant="subtitle1"
      component="span"
      data-testid={headerTestId}
      display="block"
    >
      {props.children}
    </Typography>
  );
}

// ~~~ <hr /> ~~~
export function HorizontalRuleRenderer(props: IRendererProps) {
  const dividerClasses = useDividerStyles();
  return (
    <Grid container direction="row" justify="center">
      <Grid item xs={7} sm={6} md={4}>
        <Divider classes={dividerClasses} data-testid="markdown-divider">
          {props.children}
        </Divider>
      </Grid>
    </Grid>
  );
}

// ~~~ Links ~~~
export function LinkRenderer(props: ILinkRendererProps) {
  return (
    <strong>
      <Link href={props.href} data-testid="markdown-link">
        {props.children}
      </Link>
    </strong>
  );
}

// ~~~ Quote ~~~
export function BlockQuoteRenderer(props: IRendererProps) {
  const blockQuoteClasses = useBlockQuoteStyles();
  const blockQuoteTextClass = useBlockQuoteTextStyles();
  return (
    <Paper classes={blockQuoteClasses} elevation={elevationDepth}>
      <ParenthesesIcon style={{ opacity: 0.8 }} />
      <Box pl={2} pr={2}>
        <div className={blockQuoteTextClass.root} data-testid="markdown-blockquote">
          {props.children}
        </div>
      </Box>
      <Grid container direction="row" justify="flex-end">
        <Grid item>
          <ParenthesesIcon style={{ opacity: 0.8 }} />
        </Grid>
      </Grid>
    </Paper>
  );
}

// ~~~ <img /> ~~~
// FIXME: hide image when it's too large for the screen
// ! "display: block" allows the box-shadow to be displayed
export function ImageRenderer(props: IImgRendererProps) {
  const imgWrapperClasses = useImageWrapperStyles();
  const imgClasses = useImgStyles();
  return (
    <Grid component="span" container direction="row" justify="center">
      <Grid classes={imgWrapperClasses} component="span" item>
        <Box component="span" display="block" boxShadow={elevationDepth}>
          <img
            className={imgClasses.root}
            src={props.src}
            alt={props.alt}
            data-testid="markdown-img"
          />
        </Box>
      </Grid>
    </Grid>
  );
}

// ~~~ Table ~~~
export function TableHeadRenderer(props: IRendererProps) {
  const tableHeaderClasses = useTableHeaderStyles();
  return (
    <thead className={tableHeaderClasses.root} data-testid="markdown-thead">
      {props.children}
    </thead>
  );
}

export function TableCellRenderer(props: IRendererProps) {
  const tableCellClasses = useTableCellStyles();
  return (
    <td className={tableCellClasses.root} data-testid="markdown-td">
      {props.children}
    </td>
  );
}

export function TableRenderer(props: IRendererProps) {
  const tableClasses = useTableStyles();
  return (
    <Grid container direction="row" justify="center">
      <Grid item>
        <Box boxShadow={elevationDepth}>
          <table className={tableClasses.table} data-testid="markdown-table">
            {props.children}
          </table>
        </Box>
      </Grid>
    </Grid>
  );
}

export function InlineCodeRenderer(props: IRendererProps) {
  const styleClasses = useInlineCodeStyles();
  return (
    <span className={styleClasses.text} data-testid="markdown-inline-code">
      {props.children}
    </span>
  );
}

// ~~~ Lists ~~~
export function ListRenderer(props: IListRendererProps) {
  return (
    <Typography component="div" variant="body1">
      {props.ordered ? (
        <ol data-testid="markdown-ordered-list">{props.children}</ol>
      ) : (
        <ul data-testid="markdown-unordered-list">{props.children}</ul>
      )}
    </Typography>
  );
}
