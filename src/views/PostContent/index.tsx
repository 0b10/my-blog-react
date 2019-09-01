import React from "react";

import Background from "./Background";
import Dates, { IPostContentDatesProps } from "./Dates";
import Heading from "./Heading";
import Markdown from "./Markdown";

export const PostContent = (props: IPostContentProps) => (
  <Background data-testid="post-content-background">
    <Dates createdAt={props.createdAt} modifiedAt={props.modifiedAt} />
    <Heading>{props.heading}</Heading>
    <Markdown>{props.children}</Markdown>
  </Background>
);

type IPostContentProps = IContentComponentProps & IPostContentDatesProps;

export interface IContentComponentProps {
  children: string;
  heading: string;
}
