import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { Post, Container } from "../../components/Post/index";
import { POSTS_QUERY } from "../gql-strings";

export default (props: IPostsProps) => {
  const { error, loading, data } = useQuery(POSTS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <Container>
      {data.posts.map((post: IPostsData, index: number) => (
        <Post
          imgAltText={post.imgAltText}
          imgUrl={post.imgUrl}
          key={index}
          postUrl={post.postUrl}
          routeHandler={props.routeHandler}
          title={post.title}
          tldr={post.tldr}
        />
      ))}
    </Container>
  );
};

interface IPostsProps {
  routeHandler: (postUrl: string) => void;
}

export interface IPostsData {
  __typename: string;
  id: string;
  imgAltText: string;
  imgUrl: string;
  postUrl: string;
  title: string;
  tldr: string;
}
