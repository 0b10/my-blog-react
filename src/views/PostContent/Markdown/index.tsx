/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from "react";

// @ts-ignore
import breaks from "remark-breaks";
import ReactMarkdown from "react-markdown";

import {
  BlockQuoteRenderer,
  CodeRenderer,
  HeadingRenderer,
  HorizontalRuleRenderer,
  ImageRenderer,
  InlineCodeRenderer,
  LinkRenderer,
  ListRenderer,
  ParagraphRenderer,
  TableCellRenderer,
  TableHeadRenderer,
  TableRenderer,
} from "./renderers";
import { MarkdownProps } from "./types";

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
  thematicBreak: HorizontalRuleRenderer,
};

export const Markdown = (props: MarkdownProps) =>
  props.children ? (
    <ReactMarkdown renderers={markdownRenderers} escapeHtml={true} plugins={[breaks]}>
      {props.children}
    </ReactMarkdown>
  ) : null;
