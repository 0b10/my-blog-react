import React from "react";

import { Route, RouteComponentProps } from "react-router-dom";
import { StaticContext } from "react-router";

import { NavBar, Posts, PostContent } from "./views";
import { withPostContentQuery, withPostsQuery } from "./graphql";

// >>> INIT >>>
const PostContentQuery = withPostContentQuery(PostContent);
const PostsQuery = withPostsQuery(Posts);

// >>> RENDERER WRAPPERS >>>
const PostsQueryAdapter = ({ history }: RouteComponentProps<any, StaticContext, any>) => (
  <PostsQuery routeHandler={(id) => history.push(`/post/${id}`)} />
);

const PostContentQueryAdapter = ({ match }: RouteComponentProps<any, StaticContext, any>) => (
  <PostContentQuery postId={match.params.id} />
);

const NavBarAdapter = ({ history }: RouteComponentProps<any, StaticContext, any>) => (
  <NavBar items={[{ path: "/", text: "home" }]} routeHandler={history.push} />
);

// >>> COMPONENTS >>>
export const AppRouter: React.FC = () => (
  <React.Fragment>
    <Route path="/" render={NavBarAdapter} />
    <Route path="/" exact render={PostsQueryAdapter} />
    <Route path="/post/:id" exact render={PostContentQueryAdapter} />
  </React.Fragment>
);

export const App: React.FC = () => {
  return <AppRouter />;
};
