import React from "react";

import {
  Box,
  Divider,
  Grid,
  Link,
  makeStyles,
  Paper,
  Typography,
  useTheme
} from "@material-ui/core";
import { Code as CodeIcon, FormatQuote as ParenthesesIcon } from "@material-ui/icons";
// @ts-ignore
import { xt256 as syntaxTheme } from "react-syntax-highlighter/dist/cjs/styles/hljs";
// @ts-ignore
import breaks from "remark-breaks";
import ReactMarkdown from "react-markdown";
import SyntaxHiglighter from "react-syntax-highlighter";

// >>> MD RENDERERS >>>
// ~~~ Paragraph ~~
const ParagraphRenderer = (props: IRendererProps) => {
  return <Typography variant="body1">{props.children}</Typography>;
};

// ~~~ Headers ~~~
function HeadingRenderer(props: IHeadingRendererProps) {
  const headerClasses = useHeaderStyles();
  // assume props.level is 1-6, and type it as h1 because it is constrained
  return (
    <Typography
      classes={headerClasses}
      variant={`h${props.level}` as "h1"}
      data-testid="markdown-header"
    >
      {props.children}
    </Typography>
  );
}

// ~~~ <hr />
function HorizontalRuleRenderer(props: IRendererProps) {
  const dividerClasses = useDividerStyles();
  return (
    <Grid container direction="row" justify="center">
      <Grid item xs={7} sm={6} md={4}>
        <Divider classes={dividerClasses}>{props.children}</Divider>
      </Grid>
    </Grid>
  );
}

// ~~~ Links ~~~
function LinkRenderer(props: ILinkRendererProps) {
  return (
    <strong>
      <Link href={props.href}>{props.children}</Link>
    </strong>
  );
}

// ~~~ Quote ~~~
function BlockQuoteRenderer(props: IRendererProps) {
  const blockQuoteClasses = useBlockQuoteStyles();
  const blockQuoteTextClass = useBlockQuoteTextStyles();
  return (
    <Paper classes={blockQuoteClasses} elevation={elevationDepth}>
      <ParenthesesIcon style={{ opacity: 0.8 }} />
      <Box pl={2} pr={2}>
        <div className={blockQuoteTextClass.root}>{props.children}</div>
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
function ImageRenderer(props: IImgRendererProps) {
  const imgWrapperClasses = useImageWrapperStyles();
  const imgClasses = useImgStyles();
  return (
    <Grid component="span" container direction="row" justify="center">
      <Grid classes={imgWrapperClasses} component="span" item>
        <Box component="span" display="block" boxShadow={elevationDepth}>
          <img className={imgClasses.root} src={props.src} alt={props.alt} />
        </Box>
      </Grid>
    </Grid>
  );
}

// ~~~ Table ~~~
function TableHeadRenderer(props: IRendererProps) {
  const tableHeaderClasses = useTableHeaderStyles();
  return <thead className={tableHeaderClasses.root}>{props.children}</thead>;
}

function TableCellRenderer(props: IRendererProps) {
  const tableCellClasses = useTableCellStyles();
  return <td className={tableCellClasses.root}>{props.children}</td>;
}

function TableRenderer(props: IRendererProps) {
  const tableClasses = useTableStyles();
  return (
    <Grid container direction="row" justify="center">
      <Grid item>
        <Box boxShadow={elevationDepth}>
          <table className={tableClasses.table}>{props.children}</table>
        </Box>
      </Grid>
    </Grid>
  );
}

// ~~~ Code ~~~
function CodeRenderer(props: ICodeRendererProps) {
  const codeMountClasses = useCodeMountStyles();
  const theme = useTheme();
  return (
    <Paper classes={codeMountClasses} elevation={elevationDepth}>
      <React.Fragment>
        <CodeIcon />
        <SyntaxHiglighter
          language={props.language}
          style={syntaxTheme}
          customStyle={{
            padding: theme.spacing(3),
            margin: "0px",
            borderRadius: theme.shape.borderRadius
          }}
          showLineNumbers
        >
          {props.value}
        </SyntaxHiglighter>
      </React.Fragment>
    </Paper>
  );
}

function InlineCodeRenderer(props: IRendererProps) {
  const styleClasses = useInlineCodeStyles();
  return <span className={styleClasses.text}>{props.children}</span>;
}

// ~~~ Lists ~~~
function ListRenderer(props: IListRendererProps) {
  return (
    <Typography component="div" variant="body1">
      {props.ordered ? <ol>{props.children}</ol> : <ul>{props.children}</ul>}
    </Typography>
  );
}

// >>> COMPONENTS >>>
export default (() => {
  const markdownRenderers = {
    blockquote: BlockQuoteRenderer,
    code: CodeRenderer,
    heading: HeadingRenderer,
    image: ImageRenderer,
    imageReference: ImageRenderer,
    inlineCode: InlineCodeRenderer,
    link: LinkRenderer,
    linkReference: LinkRenderer,
    list: ListRenderer,
    paragraph: ParagraphRenderer,
    table: TableRenderer,
    tableCell: TableCellRenderer,
    tableHead: TableHeadRenderer,
    thematicBreak: HorizontalRuleRenderer
  };

  return (props: IContentComponentProps) => {
    return props.children ? (
      <ReactMarkdown
        renderers={markdownRenderers}
        escapeHtml={true}
        plugins={[breaks]}
        data-testid="post-markdown"
      >
        {props.children}
      </ReactMarkdown>
    ) : null;
  };
})();

// >>> STYLES >>>
const elevationDepth = 8; // For Box and Paper
const marginSpacing = 2; // margin between root container and top level elements - images, block quotes etc.

// ~~~  Block Quote ~~~
const useBlockQuoteStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    fontStyle: "italic",
    textAlign: "justify"
  }
}));

const useBlockQuoteTextStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.text.secondary
  }
}));

// ~~~ Code ~~~
const useCodeMountStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(1), // The code icon takes up some of this space
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    margin: theme.spacing(marginSpacing)
  }
}));

const useInlineCodeStyles = makeStyles(theme => ({
  text: {
    fontWeight: "bold",
    color: theme.palette.secondary.main,
    fontFamily: "monospace, monospace !important"
  }
}));

// ~~~ Divider ~~~
const useDividerStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}));

// ~~~ Images ~~~
const useImageWrapperStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(marginSpacing)
  }
}));

const useImgStyles = makeStyles(theme => ({
  root: {
    display: "block",
    maxWidth: "100%"
  }
}));

// ~~~ Table ~~~
const useTableStyles = makeStyles(theme => ({
  table: {
    borderCollapse: "collapse",
    color: theme.palette.text.primary
  }
}));

const useTableCellStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderCollapse: "collapse",
    padding: theme.spacing(2)
  }
}));

const useTableHeaderStyles = makeStyles(theme => ({
  root: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.getContrastText(theme.palette.secondary.dark)
  }
}));

// ~~~ Header ~~~
const useHeaderStyles = makeStyles(theme => ({
  root: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

// >>> INTERFACES >>>
interface IContentComponentProps {
  children: string;
}

interface IRendererProps {
  children: string;
}

interface IHeadingRendererProps {
  children: string;
  level: number;
}

interface ILinkRendererProps {
  children: string;
  href: string;
}

interface IImgRendererProps {
  children: string;
  src: string;
  alt: string;
}

interface ICodeRendererProps {
  value: string;
  language: string;
}

interface IListRendererProps {
  children: JSX.Element | JSX.Element[];
  ordered?: boolean;
}
