import React from "react";
import { storiesOf } from "@storybook/react";
import { ApolloProvider } from "@apollo/react-hooks";

import * as fakeQl from "../../fake/fakeql-endpoints";
import apolloClientFactory from "../../apollo";
import Posts from "./Posts";
import PostsContainer from "./PostsContainer";

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);

storiesOf("GraphQL", module).add("Default", () => (
  <ApolloProvider client={apolloClient}>
    <PostsContainer>
      <Posts routeHandler={() => null} />
    </PostsContainer>
  </ApolloProvider>
));
