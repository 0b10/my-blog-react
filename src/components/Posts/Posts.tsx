import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Post from "./Post";

const POSTS_QUERY = gql`
  {
    posts {
      __typename
      id
      imgAltText
      imgUrl
      postUrl
      title
      tldr
    }
  }
`;

export default (props: IPostsProps) => {
  const { error, loading, data } = useQuery(POSTS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
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
