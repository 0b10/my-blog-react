import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Post from "../../Post";
import { act, render, RenderResult } from "@testing-library/react";
import { dummyProps } from "../helpers";

describe("#unit tests: Post", () => {
  describe("title", () => {
    it("should display correct text", () => {
      let result: RenderResult;

      act(() => {
        result = render(<Post {...dummyProps} title="Test Title" />);
      });

      expect(result!.getByText("Test Title")).toBeVisible();
    });
  });
});
