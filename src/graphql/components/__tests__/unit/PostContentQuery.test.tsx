/**
 * Test that the query component receives, and injects the expected data.
 */
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";

import { IPostContentQueryVariables, POST_CONTENT_QUERY } from "../../../gql-strings";
import { mockApolloClient } from "../helpers";
import PostContentQuery from "../../PostContentQuery";

// >>> TESTS >>>
describe("Unit Tests: GraphQL #unit #graphql", () => {
  describe("PostContentQuery", () => {
    // ~~~ Content ~~~
    describe("content", () => {
      it("should be displayed once injected", async () => {
        const result = renderPostContent("1");
        expect(await result.findByText(/^fake post content$/)).toBeVisible();
      });
    });

    // ~~~ Dates ~~~
    describe("Dates", () => {
      it("should display the createdAt date once injected", async () => {
        const result = renderPostContent("2");
        expect(await result.findByText(/^2000-01-01$/)).not.toBeNull();
      });
      it("should display the modifiedAt date once injected", async () => {
        const result = renderPostContent("2");
        expect(await result.findByText(/^2000-01-02$/)).not.toBeNull();
      });
    });
  });
});

// >>> HELPERS >>>
const renderPostContent = (postId: string) =>
  render(
    <ApolloProvider client={mockApolloClient(resolvers)}>
      <PostContentQuery postId={postId} query={POST_CONTENT_QUERY}>
        <MockDate key="mock-date"></MockDate>
        <MockContent key="mock-content"></MockContent>
      </PostContentQuery>
    </ApolloProvider>
  );

// >>> FAKES >>>
const MockDate = (props: IMockDateProps) => (
  <React.Fragment>
    <div>{props.createdAt}</div>
    <div>{props.modifiedAt}</div>
  </React.Fragment>
);

const MockContent = (props: IMockContentProps) => <div>{props.children}</div>;

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

// >>> INTERFACES >>>
interface IMockDateProps {
  createdAt?: string;
  modifiedAt?: string;
}

interface IMockContentProps {
  children?: string;
}
