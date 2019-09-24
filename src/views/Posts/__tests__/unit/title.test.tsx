import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import { dummyProps } from "../helpers";
import { Post } from "../../Post";

describe("unit tests: Post", () => {
  describe("title", () => {
    it("should display correct text", () => {
      const result = render(<Post {...dummyProps} title="Test Title" />);
      expect(result.getByText("Test Title")).toBeVisible();
    });

    it("should not be visible after TL;DR is clicked", () => {
      const result = render(<Post {...dummyProps} title="Test Title" />);

      fireEvent.mouseEnter(result.getByTestId("post"));

      expect(result.queryByText("Test Title")).not.toBeVisible();
    });
  });
});
