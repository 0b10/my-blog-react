import React from "react";

import _ from "lodash";
import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render, RenderResult } from "@testing-library/react";

import { IPostsData } from "../../withPostsQuery";
import { mockApolloClient } from "../helpers";
import {
  withPostsQuery,
  IPostComponentProps,
  IContainerComponentProps
} from "../../withPostsQuery";

// >>> FIXTURES >>>
const resolvers = {
  Query: {
    posts: () => [
      {
        __typename: "Post",
        id: "1",
        imgAltText: "fake-image-alt-text-0",
        imgUrl: "a-fake-image-url-0",
        postUrl: "a-fake-post-url-0",
        title: "A fake title 0",
        tldr: "Fake TLDR data 0"
      },
      {
        __typename: "Post",
        id: "2",
        imgAltText: "fake-image-alt-text-1",
        imgUrl: "a-fake-image-url-1",
        postUrl: "a-fake-post-url-1",
        title: "A fake title 1",
        tldr: "Fake TLDR data 1"
      },
      {
        __typename: "Post",
        id: "3",
        imgAltText: "fake-image-alt-text-2",
        imgUrl: "a-fake-image-url-2",
        postUrl: "a-fake-post-url-2",
        title: "A fake title 2",
        tldr: "Fake TLDR data 2"
      }
    ]
  }
};

export const postsDummyProps = Object.freeze({
  routeHandler: () => null
});

// TODO: test routeHandler

// >>> TESTS >>>
describe("Unit Tests: GraphQL #unit", () => {
  describe("PostsQuery", () => {
    const numPosts = resolvers.Query.posts().length;
    const posts = resolvers.Query.posts;

    describe("Container", () => {
      it("should be rendered", async () => {
        let result: RenderResult;

        result = render(
          <ApolloProvider client={mockApolloClient(resolvers)}>
            <PostsQuery {...postsDummyProps} />
          </ApolloProvider>
        );

        expect(await result!.findByTestId("fake-container")).toBeVisible();
      });
    });

    // +++ test num posts +++
    it(`should render ${numPosts} posts - equal to the number of posts returned by the query`, async () => {
      let result: RenderResult;

      result = render(
        <ApolloProvider client={mockApolloClient(resolvers)}>
          <PostsQuery {...postsDummyProps} />
        </ApolloProvider>
      );

      expect(await result!.findAllByTestId("post")).toHaveLength(3);
    });

    // +++ test visible text +++
    ["tldr", "title"].forEach((field: string) => {
      describe(`each ${field}`, () => {
        posts()
          .map((post: IPostsData) => post[field])
          .forEach((fieldValue: string) => {
            it(`should be received and injected with the value: "${fieldValue}"`, async () => {
              let result: RenderResult;

              result = render(
                <ApolloProvider client={mockApolloClient(resolvers)}>
                  <PostsQuery {...postsDummyProps} />
                </ApolloProvider>
              );

              expect(await result!.findByText(fieldValue)).toHaveTextContent(fieldValue);
            });
          });
      });
    });

    describe(`each imgAltText`, () => {
      posts()
        .map((post: IPostsData) => post.imgAltText)
        .forEach((imgAltText: string) => {
          it(`should be received and injected with the value: "${imgAltText}"`, async () => {
            let result: RenderResult;

            result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <PostsQuery {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result!.findByText(imgAltText)).toBeDefined();
          });
        });
    });

    describe(`each imgUrl`, () => {
      posts()
        .map((post: IPostsData) => post.imgUrl)
        .forEach((imgUrl: string) => {
          it(`should be received and injected with the value: "${imgUrl}"`, async () => {
            let result: RenderResult;

            result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <PostsQuery {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result!.findByText(imgUrl)).toBeDefined();
          });
        });
    });

    describe(`each postUrl`, () => {
      posts()
        .map((post: IPostsData) => post.postUrl)
        .forEach((postUrl: string) => {
          it(`should be received and injected with the value: "${postUrl}"`, async () => {
            let result: RenderResult;

            result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <PostsQuery {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result!.findByText(postUrl)).toBeDefined();
          });
        });
    });
  });
});

// >>> FAKES >>>
const FakePost = (props: IPostComponentProps) => (
  <div data-testid="post">
    <div>{props.imgAltText}</div>
    <div>{props.imgUrl}</div>
    <div>{props.postUrl}</div>
    <div>{props.title}</div>
    <div>{props.tldr}</div>
  </div>
);

const FakeContainer = (props: IContainerComponentProps) => (
  <div data-testid="fake-container">{props.children}</div>
);

const PostsQuery = withPostsQuery(FakePost, FakeContainer);
