import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { POST_CONTENT_QUERY } from "../gql-strings";

export const withPostContentQuery = (
  PostContentComponent: React.FC<IPostContentComponentProps>
) => {
  return (props: IPostContentQueryProps) => {
    const { error, loading, data } = useQuery(POST_CONTENT_QUERY, {
      variables: { id: props.postId }
    });

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data.postContent) {
      // TODO: #error - handle this error more cleanly, if necessary
      throw new Error(
        "GraphQL Query: postContent is falsy or null, when error and loading are also false"
      );
    }

    const { content, createdAt, modifiedAt, post } = data.postContent;

    return (
      <PostContentComponent createdAt={createdAt} modifiedAt={modifiedAt} heading={post.title}>
        {content}
      </PostContentComponent>
    );
  };
};

export interface IPostContentComponentProps {
  children: string;
  createdAt: string;
  heading: string;
  modifiedAt: string;
}

interface IPostContentQueryProps {
  postId: string;
}
