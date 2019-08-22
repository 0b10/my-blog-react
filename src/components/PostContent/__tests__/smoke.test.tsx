import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import PostContent from "../PostContent";

describe("Smoke Tests: PostContent", () => {
  it("should render", () => {
    const { getByTestId } = render(<PostContent>Test text</PostContent>);

    expect(getByTestId("post-content")).toBeVisible();
  });
});
