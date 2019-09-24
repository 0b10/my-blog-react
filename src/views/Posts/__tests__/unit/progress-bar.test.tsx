import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { Post } from "../../Post";
import { dummyProps } from "../helpers";

describe("unit tests: Post", () => {
  describe("progress bar", () => {
    it("should display when loading is true", () => {
      const result = render(<Post {...dummyProps} loading={true} />);
      expect(result.getByTestId("progress-bar")).toBeVisible();
    });

    it("should not display when loading is false", () => {
      const result = render(<Post {...dummyProps} loading={false} />);
      expect(result.queryByTestId("progress-bar")).toBeNull();
    });
  });
});
