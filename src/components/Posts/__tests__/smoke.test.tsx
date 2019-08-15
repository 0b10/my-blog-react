import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, render, RenderResult } from "@testing-library/react";
import Post from "../Post";
import PostsContainer from "../PostsContainer";
import { dummyProps } from "./helpers";

describe("#smoke tests: Post", () => {
  it("should render", () => {
    let result: RenderResult;
    act(() => {
      result = render(<Post {...dummyProps} />);
    });
    expect(result!.getByTestId("post")).toBeVisible();
  });
});

describe("#smoke tests: PostsContainer", () => {
  it("should render", () => {
    let result: RenderResult;
    act(() => {
      result = render(
        <PostsContainer>
          <Post {...dummyProps} />
        </PostsContainer>
      );
    });
    expect(result!.getByTestId("post")).toBeVisible();
  });
});
