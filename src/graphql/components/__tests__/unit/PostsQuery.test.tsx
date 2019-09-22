/**
 * Test that the queried data is injected.
 */
// ! Don't test the order in which the posts are arranged - this should be tested within the
// !  Posts component
import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { render } from "@testing-library/react";

import { PostData } from "../../withPostsQuery";
import { mockApolloClient, postsDummyProps } from "../helpers";
import { PostsComponentProps, withPostsQuery } from "../../withPostsQuery";

// >>> FIXTURES >>>
const resolvers = {
  Query: {
    posts: () => [
      {
        __typename: "Post",
        id: "1",
        imgAltText: "fake-image-alt-text-0",
        imgUrl: "a-fake-image-url-0",
        title: "A fake title 0",
        tldr: "Fake TLDR data 0",
      },
      {
        __typename: "Post",
        id: "2",
        imgAltText: "fake-image-alt-text-1",
        imgUrl: "a-fake-image-url-1",
        title: "A fake title 1",
        tldr: "Fake TLDR data 1",
      },
      {
        __typename: "Post",
        id: "3",
        imgAltText: "fake-image-alt-text-2",
        imgUrl: "a-fake-image-url-2",
        title: "A fake title 2",
        tldr: "Fake TLDR data 2",
      },
    ],
  },
};

// TODO: test routeHandler.

// >>> TESTS >>>
describe("unit tests: GraphQL #unit", () => {
  describe("component: PostsQuery", () => {
    const numPosts = resolvers.Query.posts().length;
    const posts = resolvers.Query.posts;

    // +++ test num posts +++
    it(`should render ${numPosts} posts - equal to the number of posts returned by the query`, async () => {
      const result = render(
        <ApolloProvider client={mockApolloClient(resolvers)}>
          <PostsQuery {...postsDummyProps} />
        </ApolloProvider>
      );

      expect(await result.findAllByTestId("post")).toHaveLength(3);
    });

    // +++ test visible text +++
    ["tldr", "title"].forEach((field: string) => {
      describe(`each ${field}`, () => {
        posts()
          .map((post: PostData) => post[field])
          .forEach((fieldValue: string) => {
            it(`should be received and injected with the value: "${fieldValue}"`, async () => {
              const result = render(
                <ApolloProvider client={mockApolloClient(resolvers)}>
                  <PostsQuery {...postsDummyProps} />
                </ApolloProvider>
              );

              expect(await result.findByText(fieldValue)).toBeDefined();
            });
          });
      });
    });

    describe(`each imgAltText`, () => {
      posts()
        .map((post: PostData) => post.imgAltText)
        .forEach((imgAltText: string) => {
          it(`should be received and injected with the value: "${imgAltText}"`, async () => {
            const result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <PostsQuery {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result.findByText(imgAltText)).toBeDefined();
          });
        });
    });

    describe(`each imgUrl`, () => {
      posts()
        .map((post: PostData) => post.imgUrl)
        .forEach((imgUrl: string) => {
          it(`should be received and injected with the value: "${imgUrl}"`, async () => {
            const result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <PostsQuery {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result.findByText(imgUrl)).toBeDefined();
          });
        });
    });

    describe(`each post id`, () => {
      posts()
        .map((post: PostData) => post.id)
        .forEach((id) => {
          it(`should be received and injected with the value: "${id}"`, async () => {
            const reId = RegExp(`^${id}$`);

            const result = render(
              <ApolloProvider client={mockApolloClient(resolvers)}>
                <PostsQuery {...postsDummyProps} />
              </ApolloProvider>
            );

            expect(await result.findByText(reId)).toBeDefined();
          });
        });
    });
  });
});

// >>> FAKES >>>
const FakePosts = (props: PostsComponentProps) => (
  <div>
    {props.posts.map((post, index) => (
      <div data-testid="post" key={index}>
        <div>{post.imgAltText}</div>
        <div>{post.imgUrl}</div>
        <div>{post.id}</div>
        <div>{post.title}</div>
        <div>{post.tldr}</div>
      </div>
    ))}
  </div>
);

const PostsQuery = withPostsQuery(FakePosts);
