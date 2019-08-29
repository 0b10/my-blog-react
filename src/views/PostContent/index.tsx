import React from "react";

import Background from "./Background";
import Dates, { IPostContentDatesProps } from "./Dates";
import Markdown from "./Markdown";

export const PostContent = (props: IPostContentProps) => (
  <Background>
    <Dates createdAt={props.createdAt} modifiedAt={props.modifiedAt} />
    <Markdown>{props.children}</Markdown>
  </Background>
);

type IPostContentProps = IContentComponentProps & IPostContentDatesProps;

export interface IContentComponentProps {
  children: string;
}
