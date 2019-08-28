import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { storiesOf } from "@storybook/react";

import { Container, Post } from "../components/Post"; // ! Fix coupling
import { POST_CONTENT_QUERY } from "./gql-strings";
import { withPostsQuery } from "./components/withPostsQuery";
import * as fakeQl from "./fakeql/fakeql-endpoints";
import apolloClientFactory from "./apollo";
import postContentFactory from "../components/PostContent";

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);
const PostsQuery = withPostsQuery(Post, Container);

// FIXME: #coupling - find a way to not depend on Post and Container, probably fakes - but not good enough.

// ~~~ Posts ~~~
storiesOf("GraphQL", module).add("Posts", () => (
  <ApolloProvider client={apolloClient}>
    <Container>
      <PostsQuery routeHandler={() => null} />
    </Container>
  </ApolloProvider>
));

// ~~~ PostContent ~~~
const PostContent = postContentFactory({ apiClient: "Apollo", query: POST_CONTENT_QUERY });

storiesOf("GraphQL", module).add("PostContent", () => (
  <ApolloProvider client={apolloClient}>
    <PostContent postId="1" />
  </ApolloProvider>
));
