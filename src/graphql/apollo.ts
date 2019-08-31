import { ApolloClient, DefaultOptions } from "apollo-client";
import { ApolloLink } from "apollo-link";
import assert from "assert";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { SchemaLink } from "apollo-link-schema";

const apolloLinkFactory = (uri: string) =>
  ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri,
      credentials: "same-origin"
    })
  ]);

export default (uri?: string, enableCache = true, mockSchemaLink: false | SchemaLink = false) => {
  assert(
    !uri !== !mockSchemaLink,
    `Uri and mockSchemaLink are logically mutually exlusive: ${{ uri, mockSchemaLink }}`
  );

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: enableCache ? "cache-first" : "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: enableCache ? "cache-first" : "no-cache",
      errorPolicy: "all"
    },
    mutate: {
      fetchPolicy: enableCache ? "cache-first" : "no-cache",
      errorPolicy: "all"
    }
  };

  return new ApolloClient({
    link: mockSchemaLink ? mockSchemaLink : apolloLinkFactory(uri as string), // uri is guarded
    cache: new InMemoryCache({
      cacheRedirects: {
        Query: {
          post: (_, args, { getCacheKey }) => getCacheKey({ __typename: "Post", id: args.id }),
          // BUG: args is null when going from postContentQuery to postQuery
          posts: (_, args, { getCacheKey }) => {
            return args.ids.map((id: string) => getCacheKey({ __typename: "Post", id }));
          }
        }
      }
    }),
    defaultOptions
  });
};
