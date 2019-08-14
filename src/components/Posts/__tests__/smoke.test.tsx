import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { act, render, RenderResult } from "@testing-library/react";
import Post from "../Post";
import { dummyProps } from "./helpers";

describe("#smoke tests: Post", () => {
  it("should render", () => {
    let result: RenderResult;
    act(() => {
      result = render(<Post {...dummyProps} title="dummy title" />);
    });
    expect(result!.getByTestId("post")).toBeVisible();
  });
});
