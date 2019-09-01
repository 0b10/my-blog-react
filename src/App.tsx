import React from "react";

import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { StaticContext } from "react-router";

import { Posts, PostContent } from "./views";
import { withPostContentQuery, withPostsQuery } from "./graphql";

// >>> INIT >>>
const PostContentQuery = withPostContentQuery(PostContent);
const PostsQuery = withPostsQuery(Posts);

// >>> RENDERER WRAPPERS >>>
const PostsQueryRenderer = ({ history }: RouteComponentProps<any, StaticContext, any>) => (
  <PostsQuery routeHandler={id => history.push(`/post/${id}`)} />
);

const PostContentQueryRenderer = ({ match }: RouteComponentProps<any, StaticContext, any>) => (
  <PostContentQuery postId={match.params.id} />
);

// >>> COMPONENTS >>>
export const AppRouter: React.FC = () => (
  <Switch>
    <Route path="/" exact render={PostsQueryRenderer} />} />
    <Route path="/post/:id" exact render={PostContentQueryRenderer} />
  </Switch>
);

export const App: React.FC = () => {
  return <AppRouter />;
};
