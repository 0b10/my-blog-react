import React from "react";

import { HeaderImage, HeaderImageProps } from "./HeaderImage";
import Background from "./Background";
import Dates from "./Dates";
import Markdown from "./Markdown";
import Title from "./Title";

export const PostContent = ({
  children,
  createdAt,
  headerImageProps,
  modifiedAt,
  title,
  tldr,
}: PostContentProps) => (
  <Background data-testid="post-content-background">
    <HeaderImage {...headerImageProps} />
    {createdAt && modifiedAt ? <Dates createdAt={createdAt} modifiedAt={modifiedAt} /> : null}
    <Title>{title}</Title>
    <div>{tldr}</div>
    <Markdown>{children}</Markdown>
  </Background>
);

export interface PostContentProps {
  children: string;
  createdAt?: string;
  headerImageProps: HeaderImageProps;
  modifiedAt?: string;
  title: string;
  tldr: string;
}
