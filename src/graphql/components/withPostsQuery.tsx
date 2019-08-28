import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { POSTS_QUERY } from "../gql-strings";

export const withPostsQuery = (
  PostComponent: React.FC<IPostComponentProps>,
  Container: React.FC<IContainerComponentProps>
) => {
  return (props: IPostsQueryProps) => {
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
          <PostComponent
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
};

export interface IPostComponentProps {
  routeHandler: (postUrl: string) => void;
  imgAltText: string;
  imgUrl: string;
  postUrl: string;
  title: string;
  tldr: string;
}

interface IPostsQueryProps {
  routeHandler: (postUrl: string) => void;
}

export interface IContainerComponentProps {
  children: JSX.Element | JSX.Element[];
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
