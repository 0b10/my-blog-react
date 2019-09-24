import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { dummyProps } from "../helpers";
import { Post } from "../../Post";

describe("unit tests: Post", () => {
  describe("card image", () => {
    it("should be visible", () => {
      const result = render(
        <Post
          {...dummyProps}
          imgUrl="https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg"
        />
      );

      expect(result.getByTestId("post-img-url")).toBeVisible();
    });

    it("should contain image #alt-text", () => {
      const result = render(<Post {...dummyProps} imgAltText="image-alt-text" />);
      expect(result.getByTestId("post-img-url")).toHaveAttribute("alt", "image-alt-text");
    });
  });
});
