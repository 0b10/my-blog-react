import React from "react";

import { Route, Switch } from "react-router-dom";

import { Posts, PostContent } from "./views";
import { withPostContentQuery, withPostsQuery } from "./graphql";

const PostContentQuery = withPostContentQuery(PostContent);
const PostsQuery = withPostsQuery(Posts);

export const App: React.FC = () => {
  return <AppRouter />;
};

export const AppRouter: React.FC = () => (
  <Switch>
    <Route
      path="/"
      exact
      render={props => <PostsQuery routeHandler={id => props.history.push(`/post/${id}`)} />}
    />
    <Route
      path="/post/:id"
      exact
      render={props => <PostContentQuery postId={props.match.params.id} />}
    />
  </Switch>
);
