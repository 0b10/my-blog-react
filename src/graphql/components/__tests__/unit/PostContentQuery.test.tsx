/**
 * Test that the query component receives, and injects the expected data.
 */
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";

import { PostContentQueryVariables } from "../../../gql-strings";
import { mockApolloClient } from "../helpers";
import { PostContentComponentProps, withPostContentQuery } from "../../withPostContentQuery";

// >>> FAKES >>>
const FakePostContent = (props: PostContentComponentProps) => (
  <div>
    <div data-testid="fake-modified-at">{props.modifiedAt}</div>
    <div data-testid="fake-created-at">{props.createdAt}</div>
    <div data-testid="fake-content">{props.children}</div>
    <div data-testid="fake-title">{props.title}</div>
  </div>
);

const resolvers = {
  Query: {
    postContent: (_: any, { id }: PostContentQueryVariables) => {
      switch (id) {
        case "1":
          return {
            __typename: "PostContent",
            content: "fake post content",
            createdAt: "2000-01-01",
            id: "1",
            modifiedAt: "2000-01-01",
            post: {
              __typename: "Post",
              id: "1",
              imgAltText: "fake image alt text",
              imgUrl: "fake-image-url",
              title: "A fake title",
              tldr: "Fake TLDR data",
            },
          };
        case "2":
          return {
            __typename: "PostContent",
            content: "# fake markdown header",
            createdAt: "2000-01-01",
            id: "1",
            modifiedAt: "2000-01-02",
            post: {
              __typename: "Post",
              id: "1",
              imgAltText: "fake image alt text",
              imgUrl: "fake-image-url",
              title: "A fake title",
              tldr: "Fake TLDR data",
            },
          };
        default:
          return null;
      }
    },
  },
};

// >>> HELPERS >>>
const renderPostContent = (postId: string) =>
  render(
    <ApolloProvider client={mockApolloClient(resolvers)}>
      <PostContentQuery postId={postId}></PostContentQuery>
    </ApolloProvider>
  );

// >>> INIT >>>
const PostContentQuery = withPostContentQuery(FakePostContent);

// >>> TESTS >>>
describe("unit tests: GraphQL #unit #graphql", () => {
  describe("component: PostContentQuery", () => {
    // ~~~ Content ~~~
    describe("content", () => {
      it("should be injected to and received by the PostContentComponent", async () => {
        const result = renderPostContent("1");
        expect(await result.findByTestId("fake-content")).toHaveTextContent(/^fake post content$/);
      });
    });

    // ~~~ Title ~~~
    describe("title", () => {
      it("should be injected to and received by the PostContentComponent", async () => {
        const result = renderPostContent("1");
        expect(await result.findByTestId("fake-title")).toHaveTextContent(/^A fake title$/);
      });
    });

    // ~~~ Dates ~~~
    describe("createdAt prop", () => {
      it("should be injected to and received by the PostContentComponent", async () => {
        const result = renderPostContent("2");
        expect(await result.findByTestId("fake-created-at")).toHaveTextContent(/^2000-01-01$/);
      });
    });

    describe("modifiedAt prop", () => {
      it("should be injected to and received by the PostContentComponent", async () => {
        const result = renderPostContent("2");
        expect(await result.findByTestId("fake-modified-at")).toHaveTextContent(/^2000-01-02$/);
      });
    });
  });
});
