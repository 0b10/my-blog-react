import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { ApolloProvider } from "@apollo/react-hooks";
import { fireEvent, render } from "@testing-library/react";

import { PostData } from "../../graphql/components/withPostsQuery";
import { mockApolloClient } from "../../graphql/components/__tests__/helpers";
import { Posts } from "../../views";
import { withPostsQuery } from "../../graphql";

// >>> FIXTURES >>>
const resolvers = {
  Query: {
    posts: () => [
      {
        __typename: "Post",
        id: "1",
        imgAltText: "fake image alt text 1",
        imgUrl: "fake-image-url-1",
        title: "A fake title 1",
        tldr: "Fake TLDR data 1",
      },
      {
        __typename: "Post",
        id: "2",
        imgAltText: "fake image alt text 2",
        imgUrl: "fake-image-url-2",
        title: "A fake title 2",
        tldr: "Fake TLDR data 2",
      },
      {
        __typename: "Post",
        id: "3",
        imgAltText: "fake image alt text 3",
        imgUrl: "fake-image-url-3",
        title: "A fake title 3",
        tldr: "Fake TLDR data 3",
      },
    ],
  },
};

const numPosts = resolvers.Query.posts().length;

// >>> HELPERS >>>
const renderPostsQuery = (routeHandler = () => null) =>
  render(
    <ApolloProvider client={mockApolloClient(resolvers)}>
      <PostsQuery routeHandler={routeHandler} />
    </ApolloProvider>
  );

// >>> INIT >>>
const PostsQuery = withPostsQuery(Posts);

// >>> TESTS >>>
describe("integration tests: PostsQuery", () => {
  it(`should render ${numPosts} posts`, async () => {
    const result = renderPostsQuery();
    expect(await result.findAllByTestId("post")).toHaveLength(numPosts);
  });

  resolvers.Query.posts().forEach(({ id, imgAltText, imgUrl, title, tldr }: PostData, index) => {
    describe(`the post with id === ${id}`, () => {
      // +++ imgAltText +++
      it(`should have the correct imgAltText value: ${imgUrl}`, async () => {
        const result = renderPostsQuery();
        const post = Object.values(await result.findAllByTestId("post-img-url"))[index];

        expect(post).toHaveAttribute("alt", imgAltText);
      });

      // +++ title +++
      it(`should have the title: ${title}`, async () => {
        const result = renderPostsQuery();
        const post = Object.values(await result.findAllByTestId("post-title"))[index];

        expect(post).toHaveTextContent(title);
      });

      // +++ tldr +++
      it(`should have the tldr: ${tldr}`, async () => {
        const result = renderPostsQuery();
        const post = Object.values(await result.findAllByTestId("post-tldr"))[index];

        expect(post).toHaveTextContent(tldr);
      });

      // +++ routeHandler +++
      it(`should provide the value: ${id}, to the routeHandler, when clicked`, async () => {
        const routeHandlerSpy = jest.fn();

        const result = renderPostsQuery(routeHandlerSpy);
        const post = Object.values(await result.findAllByTestId("post"))[index];
        fireEvent.click(post);
        fireEvent.click(await result.getByText(`Fake TLDR data ${id}`));

        expect(routeHandlerSpy.mock.calls).toHaveLength(1);
        expect(routeHandlerSpy.mock.calls[0][0]).toBe(id);
      });

      // +++ imgUrl +++
      it(`should have the correct imgUrl: ${imgUrl}`, async () => {
        const result = renderPostsQuery();
        const post = Object.values(await result.findAllByTestId("post-img-url"))[index];

        expect(post).toHaveAttribute("src", imgUrl);
      });
    });
  });
});
