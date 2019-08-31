import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { act, render, RenderResult } from "@testing-library/react";

import { dummyProps } from "./helpers";
import Post from "../Post";
import Container from "../Container";

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

describe("#smoke tests: Container", () => {
  it("should render", () => {
    let result: RenderResult;

    act(() => {
      result = render(
        <Container>
          <Post {...dummyProps} />
        </Container>
      );
    });

    expect(result!.getByTestId("post")).toBeVisible();
  });
});
