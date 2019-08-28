import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import PostContent from "../Markdown";

// TODO: #test - add a complete set of tests, test for each element type

describe("Unit Tests: PostContent", () => {
  it("should display expected text content", () => {
    const textContent = "Test text";

    const { getByText } = render(<PostContent>{textContent}</PostContent>);

    expect(getByText(textContent)).toHaveTextContent(textContent);
  });
});
