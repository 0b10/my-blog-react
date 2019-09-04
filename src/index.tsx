import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter } from "react-router-dom";

import { apolloClientFactory, fakeQl } from "./graphql";
import { App } from "./App";
import { Theme } from "./views";

const apolloClient = apolloClientFactory(fakeQl.normalApiEndpoint);

ReactDOM.render(
  <Theme theme="dark">
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Theme>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
