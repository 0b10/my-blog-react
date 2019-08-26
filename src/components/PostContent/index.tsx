import React from "react";
import { DocumentNode } from "graphql";
import ApolloQuery from "./ApolloQuery";
import Background from "./Background";
import Dates from "./Dates";
import Markdown from "./Markdown";

const withApolloClient = (query: DocumentNode) => {
  return (props: IApolloClientProps) => {
    return (
      <Background>
        <ApolloQuery query={query} postId={props.postId}>
          <Dates key="dates" />
          <Markdown key="markdown" />
        </ApolloQuery>
      </Background>
    );
  };
};

export default (options: IPostContentOptions) => {
  switch (options.apiClient) {
    case "Apollo":
      if (options.query === undefined) {
        throw new Error("You must provide a query string for PostContent queries");
      }
      return withApolloClient(options.query);
    default:
      throw new TypeError(`Invalid api client type: ${options.apiClient}`);
  }
};

interface IPostContentOptions {
  apiClient: "Apollo";
  query?: DocumentNode;
}

interface IApolloClientProps {
  postId: string;
}
