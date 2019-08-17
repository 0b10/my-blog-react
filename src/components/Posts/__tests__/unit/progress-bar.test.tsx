import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Post from "../../Post";
import { act, render, RenderResult } from "@testing-library/react";
import { dummyProps } from "../helpers";

describe("Unit Tests: Post", () => {
  describe("progress bar", () => {
    it("should display when loading is true", () => {
      let result: RenderResult;

      act(() => {
        result = render(<Post {...dummyProps} loading={true} />);
      });

      expect(result!.getByTestId("progress-bar")).toBeVisible();
    });

    it("should not display when loading is false", () => {
      let result: RenderResult;

      act(() => {
        result = render(<Post {...dummyProps} loading={false} />);
      });

      expect(result!.queryByTestId("progress-bar")).toBeNull();
    });
  });
});
