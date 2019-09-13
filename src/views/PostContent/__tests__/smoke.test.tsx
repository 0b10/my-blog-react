import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { dummyDatesProps, dummyPostContentProps } from "./helpers";
import { PostContent } from "..";
import Background from "../Background";
import Dates from "../Dates";
import Markdown from "../Markdown";

describe("Smoke Tests: PostContent", () => {
  describe("Markdown", () => {
    it("should render and be visible [#smoke,#Markdown]", async () => {
      const { findByText } = render(<Markdown>Test text</Markdown>);

      expect(await findByText("Test text")).toBeVisible();
    });
  });

  describe("Dates", () => {
    it("should render and be visible [#smoke,#Dates]", async () => {
      const result = render(<Dates {...dummyDatesProps}>Test text</Dates>);

      expect(await result.findByTestId("article-dates")).toBeVisible();
    });
  });

  describe("Background", () => {
    it("should render and be visible [#smoke,#Background]", async () => {
      const result = render(
        <Background>
          <div>dummy text</div>
        </Background>
      );

      expect(await result.findByTestId("post-content-background")).toBeVisible();
    });
  });

  describe("index (PostContent wrapper)", () => {
    it("should render all expected child components [#smoke,#PostContent,#integration]", async () => {
      const result = render(
        <PostContent {...dummyPostContentProps}>Test content text</PostContent>
      );

      expect(await result.findByTestId("markdown-paragraph")).toBeVisible();
      expect(await result.findByTestId("article-dates")).toBeVisible();
      expect(await result.findByTestId("post-content-background")).toBeVisible();
      expect(await result.findByTestId("post-title")).toBeVisible();
    });
  });
});
