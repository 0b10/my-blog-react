/* eslint-disable no-undef */
import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { storiesOf } from "@storybook/react";

import { Posts } from "../views/Posts/index"; // ! Fix coupling
import { PostContent } from "../views/PostContent"; // ! Fix coupling
import { withPostContentQuery } from "./components/withPostContentQuery";
import { withPostsQuery } from "./components/withPostsQuery";
import * as fakeQl from "./fakeql/fakeql-endpoints";
import apolloClientFactory from "./apollo";

// FIXME: #coupling - find a way to not depend on Post and Container, probably fakes - but not good enough.

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);
const PostContentQuery = withPostContentQuery(PostContent);
const PostsQuery = withPostsQuery(Posts);

// ~~~ Posts ~~~
storiesOf("GraphQL", module).add("PostsQuery", () => (
  <ApolloProvider client={apolloClient}>
    <PostsQuery routeHandler={() => null} />
  </ApolloProvider>
));

// ~~~ PostContent ~~~
storiesOf("GraphQL", module).add("PostContentQuery", () => (
  <ApolloProvider client={apolloClient}>
    <PostContentQuery postId="1" />
  </ApolloProvider>
));
