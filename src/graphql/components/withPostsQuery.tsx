import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { POSTS_QUERY } from "../gql-strings";

export const withPostsQuery = (PostsComponent: React.FC<IPostsComponentProps>) => {
  return (props: IPostsQueryProps) => {
    const { error, loading, data } = useQuery(POSTS_QUERY);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error...</div>;
    }

    return <PostsComponent posts={data.posts} routeHandler={props.routeHandler} />;
  };
};

export interface IPostsComponentProps {
  posts: IPostData[];
  routeHandler: (id: string) => void;
}

interface IPostsQueryProps {
  routeHandler: (id: string) => void;
}

export interface IPostData {
  __typename: string;
  id: string;
  imgAltText: string;
  imgUrl: string;
  title: string;
  tldr: string;
}
