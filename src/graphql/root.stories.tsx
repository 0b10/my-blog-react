import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { storiesOf } from "@storybook/react";

import { Background, Dates, Markdown } from "../views/PostContent"; // ! Fix coupling
import { Container, Post } from "../views/Post"; // ! Fix coupling
import { withPostContentQuery } from "./components/withPostContentQuery";
import { withPostsQuery } from "./components/withPostsQuery";
import * as fakeQl from "./fakeql/fakeql-endpoints";
import apolloClientFactory from "./apollo";

// FIXME: #coupling - find a way to not depend on Post and Container, probably fakes - but not good enough.

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);
const PostsQuery = withPostsQuery(Post, Container);
const PostContentQuery = withPostContentQuery(Markdown, Dates, Background);

// ~~~ Posts ~~~
storiesOf("GraphQL", module).add("PostsQuery", () => (
  <ApolloProvider client={apolloClient}>
    <Container>
      <PostsQuery routeHandler={() => null} />
    </Container>
  </ApolloProvider>
));

// ~~~ PostContent ~~~
storiesOf("GraphQL", module).add("PostContentQuery", () => (
  <ApolloProvider client={apolloClient}>
    <PostContentQuery postId="1" />
  </ApolloProvider>
));
