import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { storiesOf } from "@storybook/react";
import PostsContainer from "./PostsContainer";
import Posts from "./Posts";
import apolloClientFactory from "../../apollo";

const apolloClient = apolloClientFactory(
  "https://fakeql.com/graphql/5d28c96cd57a84df7a820059ab82a6c8"
);

storiesOf("GraphQL", module).add("Default", () => (
  <ApolloProvider client={apolloClient}>
    <PostsContainer>
      <Posts routeHandler={() => null} />
    </PostsContainer>
  </ApolloProvider>
));
