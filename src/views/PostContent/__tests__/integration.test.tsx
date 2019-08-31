import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { dummyPostContentProps } from "./helpers";
import { PostContent } from "../index";

describe("Integration Tests: PostContent", () => {
  describe("dates", () => {
    it("should display the 'Created at' date only, when both dates are the same", async () => {
      const testDates = {
        createdAt: "2019-01-01",
        modifiedAt: "2019-01-01"
      };

      const result = render(<PostContent {...dummyPostContentProps} {...testDates} />);

      expect(await result.findByText(/^Created at: 2019-01-01$/)).toBeVisible();
    });

    it("should display both 'Created at' and 'Modified at' dates, when both dates are the different", async () => {
      const testDates = {
        createdAt: "2019-01-01",
        modifiedAt: "2019-01-02"
      };

      const result = render(<PostContent {...dummyPostContentProps} {...testDates} />);

      expect(
        await result.findByText(/^Created at: 2019-01-01; Modified at: 2019-01-02$/)
      ).toBeVisible();
    });
  });

  describe("markdown", () => {
    it("should display the expected content text", async () => {
      const textContent = "fake text content";

      const result = render(<PostContent {...dummyPostContentProps}>{textContent}</PostContent>);

      expect(await result.findByText(textContent)).toBeVisible();
    });

    it("should display formatted markdown", async () => {
      const result = render(<PostContent {...dummyPostContentProps}>{"# header"}</PostContent>);

      expect(await result.findByTestId("markdown-header-level-1")).toBeVisible();
    });
  });
});
