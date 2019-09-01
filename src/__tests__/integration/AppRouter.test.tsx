import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { MemoryRouter } from "react-router";
import { render, fireEvent } from "@testing-library/react";

import { AppRouter } from "App";
import {
  IPostContentQueryResults,
  IPostContentQueryVariables,
  IPostQueryResults
} from "../../graphql/gql-strings";
import { mockApolloClient } from "../../graphql/components/__tests__/helpers";

// >>> FIXTURES >>>
// ! these object properties (e.g. id) should match that of postContent in the resolvers - these are
// !  nested graph results
const postsData: IPostQueryResults[] = [
  {
    __typename: "Post",
    id: "1",
    imgAltText: "fake image alt text 1",
    imgUrl: "fake-image-url-1",
    title: "A fake title 1",
    tldr: "Fake TLDR data 1"
  },
  {
    __typename: "Post",
    id: "2",
    imgAltText: "fake image alt text 2",
    imgUrl: "fake-image-url-2",
    title: "A fake title 2",
    tldr: "Fake TLDR data 2"
  }
];

const resolvers = {
  Query: {
    postContent: (_: any, { id }: IPostContentQueryVariables): IPostContentQueryResults => {
      switch (id) {
        case "1":
          return {
            __typename: "PostContent",
            content: "fake post content 1", // ! don't use markdown - it's tested elsewhere
            createdAt: "2000-01-01",
            id: "1",
            modifiedAt: "2000-01-01",
            post: postsData[0]
          };
        case "2":
          return {
            __typename: "PostContent",
            content: "fake post content 2", // ! don't use markdown - it's tested elsewhere
            createdAt: "2000-01-01",
            id: "2",
            modifiedAt: "2000-01-02",
            post: postsData[1]
          };
        default:
          throw new Error(`Invalid post id for mock Apollo resolver: ${id}`);
      }
    },
    posts: () => postsData
  }
};

// >>> HELPERS >>>
const post = (id: string) => resolvers.Query.postContent(undefined, { id });
const posts = () => resolvers.Query.posts();

const renderAppRouter = (route: string) =>
  render(
    <ApolloProvider client={mockApolloClient(resolvers)}>
      <MemoryRouter initialEntries={[route]}>
        <AppRouter />
      </MemoryRouter>
    </ApolloProvider>
  );

// >>> TESTS >>>
describe("Integration Tests: AppRouter", () => {
  // Only test for some of the content. More rigorous tests are performed in the other
  //  integration tests.

  describe("PostContentQuery", () => {
    [post("1"), post("2")].forEach(({ id, content }) => {
      describe(`for /post/${id}`, () => {
        it(`should render the correct content data: "${content}"`, async () => {
          const result = renderAppRouter(`/post/${id}`);
          const reContent = RegExp(`^${content}$`);
          expect(await result.findByText(reContent)).toBeVisible();
        });

        it(`should only render a single post`, async () => {
          const result = renderAppRouter(`/post/${id}`);
          expect(await result.findAllByTestId("post-content-background")).toHaveLength(1);
        });
      });
    });
  });

  describe("PostsQuery", () => {
    posts().forEach(({ id, title }, index) => {
      describe(`for post number ${id}`, () => {
        it(`should render the correct title: "${title}"`, async () => {
          const result = renderAppRouter("/");
          const reTitle = RegExp(`^${title}$`);

          const post = Object.values(await result.findAllByTestId("post-title"))[index];

          expect(post).toHaveTextContent(reTitle);
        });

        it(`should open the correct post when clicked, with content: "${
          post(id).content
        }"`, async () => {
          const result = renderAppRouter("/");
          const reContent = RegExp(`^${post(id).content}$`); // "post" specific content

          const postElement = Object.values(await result.findAllByTestId("post"))[index];
          fireEvent.click(postElement);
          const postTldr = Object.values(await result.findAllByTestId("post-tldr"))[index];
          fireEvent.click(postTldr);

          expect(await result.findByText(reContent)).toBeVisible();
        });

        it(`should open only one post when clicked"`, async () => {
          const result = renderAppRouter("/");

          const postElement = Object.values(await result.findAllByTestId("post"))[index];
          fireEvent.click(postElement);
          const postTldr = Object.values(await result.findAllByTestId("post-tldr"))[index];
          fireEvent.click(postTldr);

          expect(await result.findAllByTestId("post-content-background")).toHaveLength(1);
        });
      });
    });

    it(`should render ${posts().length} posts`, async () => {
      const result = renderAppRouter("/");
      expect(await result.findAllByTestId("post")).toHaveLength(posts().length);
    });
  });
});
