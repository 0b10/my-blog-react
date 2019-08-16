import React from "react";
import "@testing-library/jest-dom/extend-expect";
import _ from "lodash";
import Post from "../../Post";
import PostContainer from "../../PostsContainer";
import { act, render, RenderResult } from "@testing-library/react";
import { dummyProps } from "../helpers";

describe("#unit test: PostContainer", () => {
  [1, 2, 5, 100].forEach((num: number) => {
    it(`should render ${num} posts`, () => {
      let result: RenderResult;

      act(() => {
        result = render(
          <PostContainer>
            {_.range(0, num).map((_, index) => (
              <Post {...dummyProps} key={index} />
            ))}
          </PostContainer>
        );
      });

      expect(result!.queryAllByTestId("post")).toHaveLength(num);
    });
  });
});
