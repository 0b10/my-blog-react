import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Markdown from "../Markdown";

describe("Smoke Tests: Markdown", () => {
  it("should render the provided text", async () => {
    const { findByText } = render(<Markdown>Test text</Markdown>);

    expect(await findByText("Test text")).toBeVisible();
  });
});
