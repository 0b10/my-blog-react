import React from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { storiesOf } from "@storybook/react";

import { POST_CONTENT_QUERY } from "./gql-strings";
import * as fakeQl from "../fake/fakeql-endpoints";
import apolloClientFactory from "../apollo";
import postContentFactory from "../components/PostContent/index";
import Posts from "./components/PostsQuery";
import Container from "../components/Post/Container";

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);

// ~~~ Posts ~~~
storiesOf("GraphQL", module).add("Posts", () => (
  <ApolloProvider client={apolloClient}>
    <Container>
      <Posts routeHandler={() => null} />
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
