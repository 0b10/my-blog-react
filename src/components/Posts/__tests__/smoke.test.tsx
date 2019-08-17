import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, render, RenderResult } from "@testing-library/react";
import Post from "../Post";
import PostsContainer from "../PostsContainer";
import { dummyProps } from "./helpers";

describe("Smoke Tests: Post", () => {
  it("should render", () => {
    let result: RenderResult;

    act(() => {
      result = render(<Post {...dummyProps} />);
    });

    expect(result!.getByTestId("post")).toBeVisible();
  });

  it("should export a ready-to-use, factory created Post", () => {
    let result: RenderResult;

    act(() => {
      result = render(<Post {...dummyProps} />);
    });

    expect(result!.getByTestId("post")).toBeVisible();
  });

  it("exported pre-built Post(s) should not be the same object", () => {
    expect(<Post {...dummyProps} />).not.toBe(<Post {...dummyProps} />);
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
