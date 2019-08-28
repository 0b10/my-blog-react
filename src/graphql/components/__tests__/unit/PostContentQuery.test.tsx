/**
 * Test that the query component receives, and injects the expected data.
 */
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";

import { IPostContentQueryVariables } from "../../../gql-strings";
import { mockApolloClient } from "../helpers";
import {
  IBackgroundProps,
  IContentComponentProps,
  IDateComponentProps,
  withPostContentQuery
} from "../../withPostContentQuery";

// >>> TESTS >>>
describe("Unit Tests: GraphQL #unit #graphql", () => {
  describe("PostContentQuery", () => {
    // ~~~ Content ~~~
    describe("content", () => {
      it("should be received and injected by the ContentComponent", async () => {
        const result = renderPostContent("1");
        expect(await result.findByTestId("fake-content")).toHaveTextContent(/^fake post content$/);
      });
    });

    // ~~~ Dates ~~~
    describe("Dates", () => {
      it("should display the createdAt date once injected", async () => {
        const result = renderPostContent("2");
        expect(await result.findByTestId("fake-created-at")).toHaveTextContent(/^2000-01-01$/);
      });
      it("should display the modifiedAt date once injected", async () => {
        const result = renderPostContent("2");
        expect(await result.findByTestId("fake-modified-at")).toHaveTextContent(/^2000-01-02$/);
      });
    });
  });
});

// >>> HELPERS >>>
const renderPostContent = (postId: string) =>
  render(
    <ApolloProvider client={mockApolloClient(resolvers)}>
      <PostContentQuery postId={postId}></PostContentQuery>
    </ApolloProvider>
  );

// >>> FAKES >>>
const FakeDate = (props: IDateComponentProps) => (
  <div>
    <div data-testid="fake-modified-at">{props.modifiedAt}</div>
    <div data-testid="fake-created-at">{props.createdAt}</div>
  </div>
);

const FakeContent = (props: IContentComponentProps) => (
  <div data-testid="fake-content">{props.children}</div>
);

const FakeBackground = (props: IBackgroundProps) => (
  <div data-testid="fake-background">{props.children}</div>
);

const resolvers = {
  Query: {
    postContent: (_: any, { id }: IPostContentQueryVariables) => {
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
              postUrl: "fake-post-url",
              title: "A fake title",
              tldr: "Fake TLDR data"
            }
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
              postUrl: "fake-post-url",
              title: "A fake title",
              tldr: "Fake TLDR data"
            }
          };
        default:
          return null;
      }
    }
  }
};

// >>> INIT >>>
const PostContentQuery = withPostContentQuery(FakeContent, FakeDate, FakeBackground);
