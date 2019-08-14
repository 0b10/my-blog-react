import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Post from "../Post";
import { act, render, RenderResult } from "@testing-library/react";

const dummyProps = Object.freeze({
  title: "Dummy Title"
});

describe("#unit tests: Post", () => {
  describe("title", () => {
    it("should display title", () => {
      let result: RenderResult;
      act(() => {
        result = render(<Post {...dummyProps} title="Test Title" />);
      });
      expect(result!.getByText("Test Title")).toBeVisible();
    });
  });
});
