/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable no-undef */
import React from "react";

import { action } from "@storybook/addon-actions";
import { ApolloProvider } from "@apollo/react-hooks";
import { jsxDecorator } from "storybook-addon-jsx";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";

import { PostContent } from "../views/PostContent"; // ! Fix coupling
import { Posts } from "../views/Posts/index"; // ! Fix coupling
import { withPostContentQuery } from "./components/withPostContentQuery";
import { withPostsQuery } from "./components/withPostsQuery";
import * as fakeQl from "./fakeql/fakeql-endpoints";
import apolloClientFactory from "./apollo";

// FIXME: #coupling - find a way to not depend on Post and Container, probably fakes - but not good enough.

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);
const PostContentQuery = withPostContentQuery(PostContent);
const PostsQuery = withPostsQuery(Posts);

// BUG: for some reason displayName is not set when components are created by HOCs.
// BUG: The function body is shown when the displayName is set: storybookjs/addon-jsx#89
// @ts-ignore: ts(2339)
PostsQuery.displayName = "PostsQuery"; // used by jsxDecorator
// @ts-ignore: ts(2339)
PostContentQuery.displayName = "PostContentQuery"; // used by jsxDecorator

const notesForAll = `
<h1>All Components</h1>
<ul>
  <li>
    A fully configured <strong>Apollo client</strong> must be provided via the <strong>client</strong>
    prop. You can use this for mocking.
  </li>
</ul>
`;

const postsQueryNotes = `
${notesForAll}
<h1>PostsQuery</h1>
<ul>
  <li>
    When clicked, a <strong>post ID</strong> is provided to the <strong>routerHandler</strong>
    function.
  </li>
</ul>
`;

const postContentQueryNotes = `
${notesForAll}
<h1>PostContentQuery</h1>
<ul>
  <li>
    The mock API only provides posts for IDs 1-19, going beyond that will result in an error.
  </li>
</ul>
`;

const stories = storiesOf("GraphQL", module);

stories
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add(
    "PostsQuery",
    () => (
      <ApolloProvider client={apolloClient}>
        <PostsQuery routeHandler={action("Post clicked, post ID received")} />
      </ApolloProvider>
    ),
    { notes: postsQueryNotes, jsx: { showFunctions: false } }
  )
  .add(
    "PostContentQuery",
    () => (
      <ApolloProvider client={apolloClient}>
        <PostContentQuery postId={text("postId", "1")} />
      </ApolloProvider>
    ),
    { notes: postContentQueryNotes, jsx: { showFunctions: false } }
  );
