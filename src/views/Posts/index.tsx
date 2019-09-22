import React from "react";

import Container from "./Container";
import Post, { PostData, PostExtraProps } from "./Post";

export const Posts = (props: PostsProps) => (
  <Container>
    {props.posts.map((postData, index) => (
      <Post {...postData} routeHandler={props.routeHandler} key={index} />
    ))}
  </Container>
);

interface PostsProps extends PostExtraProps {
  posts: PostData[];
}
