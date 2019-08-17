import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Post from "../../Post";
import { act, fireEvent, render, RenderResult } from "@testing-library/react";
import { dummyProps } from "../helpers";

describe("Unit Tests: Post", () => {
  describe("title", () => {
    it("should display correct text", () => {
      let result: RenderResult;

      act(() => {
        result = render(<Post {...dummyProps} title="Test Title" />);
      });

      expect(result!.getByText("Test Title")).toBeVisible();
    });

    it("should not be visible after TL;DR is clicked", () => {
      let result: RenderResult;

      act(() => {
        result = render(<Post {...dummyProps} title="Test Title" />);
        fireEvent.mouseEnter(result.getByTestId("post"));
      });

      expect(result!.queryByText("Test Title")).toBeNull();
    });
  });
});
