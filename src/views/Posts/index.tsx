import React from "react";

import Container from "./Container";
import Post, { IPostData, IPostExtraProps } from "./Post";

export const Posts = (props: IPostsProps) => (
  <Container>
    {props.posts.map((postData, index) => (
      <Post {...postData} routeHandler={props.routeHandler} key={index} />
    ))}
  </Container>
);

interface IPostsProps extends IPostExtraProps {
  posts: IPostData[];
}
