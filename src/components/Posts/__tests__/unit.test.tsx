import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Post from "../Post";
import { act, render, RenderResult } from "@testing-library/react";
import { dummyProps } from "./helpers";

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

  describe("card image", () => {
    it("should be visible", () => {
      let result: RenderResult;
      act(() => {
        result = render(
          <Post
            {...dummyProps}
            imgUrl="https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg"
          />
        );
      });
      expect(result!.getByTestId("post-img-url")).toBeVisible();
    });

    it("should contain image alt text", () => {
      let result: RenderResult;
      act(() => {
        result = render(<Post {...dummyProps} imgAltText="image-alt-text" />);
      });
      expect(result!.getByTestId("post-img-url")).toHaveAttribute("alt", "image-alt-text");
    });
  });
});
