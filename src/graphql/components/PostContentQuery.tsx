import React from "react";
import { DocumentNode } from "graphql";
import { useQuery } from "@apollo/react-hooks";

export default (props: IPostContentApolloProps) => {
  const { error, loading, data } = useQuery(props.query, { variables: { id: props.postId } });

  if (error) {
    return <div>Error!</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const Dates = props.children[0];
  const Content = props.children[1];

  if (!data.postContent) {
    // TODO: #error - handle this error more cleanly, if necessary
    throw new Error(
      "GraphQL Query: postContent is falsy or null, when error and loading are also false"
    );
  }
  const { content, createdAt, modifiedAt } = data.postContent;

  return (
    <React.Fragment>
      {[
        React.cloneElement(Dates, { createdAt, modifiedAt }),
        React.cloneElement(Content, { children: content })
      ]}
    </React.Fragment>
  );
};

export interface IPostContentApolloProps {
  query: DocumentNode;
  children: JSX.Element | JSX.Element[];
  postId: string;
}
