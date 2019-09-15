import React from "react";

import _ from "lodash";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { dummyProps } from "../helpers";
import Post from "../../Post";
import PostContainer from "../../Container";

describe("unit tests: PostContainer", () => {
  [1, 2, 5, 100].forEach((num: number) => {
    it(`should render ${num} posts`, () => {
      const result = render(
        <PostContainer>
          {_.range(0, num).map((_, index) => (
            <Post {...dummyProps} key={index} />
          ))}
        </PostContainer>
      );

      expect(result.queryAllByTestId("post")).toHaveLength(num);
    });
  });
});
