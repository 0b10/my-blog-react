import React from "react";

import _ from "lodash";
import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render, RenderResult } from "@testing-library/react";

import { IPostsData } from "../../PostsQuery";
import { mockApolloClient } from "../helpers";
import Posts from "../../PostsQuery";

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

// TODO: #refactor - use fakes, not Posts

export const postsDummyProps = Object.freeze({
  routeHandler: () => null
});

// >>> TESTS >>>
describe("Unit Tests: GraphQL #unit", () => {
  describe("PostsQuery", () => {
    const numPosts = resolvers.Query.posts().length;
    const posts = resolvers.Query.posts;

    // +++ test num posts +++
    it(`should render ${numPosts} posts - equal to the number of posts returned by the query`, async () => {
      let result: RenderResult;

      result = render(
        <ApolloProvider client={mockApolloClient(resolvers)}>
          <Posts {...postsDummyProps} />
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
            it(`should display the correct value: "${fieldValue}"`, async () => {
              let result: RenderResult;

              result = render(
                <ApolloProvider client={mockApolloClient(resolvers)}>
                  <Posts {...postsDummyProps} />
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
          it(`should be applied to a post with the value: "${imgAltText}"`, async () => {
            let result: RenderResult;

            result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <Posts {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result!.findByAltText(imgAltText)).toBeDefined();
          });
        });
    });

    describe(`each imgUrl`, () => {
      posts()
        .map((post: IPostsData) => post.imgUrl)
        .forEach((imgUrl: string, index: number) => {
          it(`should applied to a post with the value: "${imgUrl}"`, async () => {
            let result: RenderResult;

            result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <Posts {...postsDummyProps} />
              </ApolloProvider>
            );

            const elements = await result!.findAllByTestId("post-img-url");
            expect(elements[index]).toHaveAttribute("src", imgUrl);
          });
        });
    });
  });
});
