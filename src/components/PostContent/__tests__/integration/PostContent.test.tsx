import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";

import { mockApolloClient } from "../../../test-helpers";
import { IPostContentQueryVariables, POST_CONTENT_QUERY } from "../../../graphql";
import postContentFactory from "../../";

const PostContentApollo = postContentFactory({ apiClient: "Apollo", query: POST_CONTENT_QUERY });

const resolvers = {
  Query: {
    postContent: (_: any, { id }: IPostContentQueryVariables) => {
      switch (id) {
        case "1":
          return {
            __typename: "PostContent",
            content: "fake article content",
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

describe("Integration Tests: PostContent #integration", () => {
  it("should render a post background", async () => {
    const result = renderPostContent("1");
    expect(await result.findByTestId("post-content-background")).toBeVisible();
  });

  it("should display main content text", async () => {
    const result = renderPostContent("1");
    expect(await result.findByText(/^fake article content$/)).toBeVisible();
  });

  // >>> DATES >>>
  describe("Dates", () => {
    it("should display the createdAt date, and only the createdAt date (for dates field)", async () => {
      const result = renderPostContent("1");
      expect(await result.findByText(/^Created at: 2000-01-01$/)).toBeVisible();
    });

    it("shouldn't display the createdAt date and modifiedAt date if they are the same", async () => {
      const result = renderPostContent("1");
      expect(await result.findByTestId("article-dates")).not.toHaveTextContent("Modified at");
    });

    it("should display both the createdAt and modifiedAt date if they are different", async () => {
      const result = renderPostContent("2");
      expect(await result.findByTestId("article-dates")).toHaveTextContent(
        /^Created at: 2000-01-01; Modified at: 2000-01-02$/
      );
    });
  });

  describe("Markdown", () => {
    it("should render markdown", async () => {
      const result = renderPostContent("2");
      expect(await result.findByTestId("markdown-header")).toBeVisible();
    });
  });
});

const renderPostContent = (postId: string) =>
  render(
    <ApolloProvider client={mockApolloClient(resolvers)}>
      <PostContentApollo postId={postId} />
    </ApolloProvider>
  );
