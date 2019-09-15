import React from "react";

import Background from "./Background";
import Dates from "./Dates";
import Title from "./Title";
import Markdown from "./Markdown";

export const PostContent = ({
  children,
  createdAt,
  modifiedAt,
  title,
  tldr,
}: IPostContentProps) => (
  <Background data-testid="post-content-background">
    {createdAt && modifiedAt ? <Dates createdAt={createdAt} modifiedAt={modifiedAt} /> : null}
    <Title>{title}</Title>
    <div>{tldr}</div>
    <Markdown>{children}</Markdown>
  </Background>
);

export interface IPostContentProps {
  children: string;
  title: string;
  tldr: string;
  createdAt?: string;
  modifiedAt?: string;
}
