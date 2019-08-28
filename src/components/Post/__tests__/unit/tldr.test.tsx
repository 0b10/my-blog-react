import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, RenderResult } from "@testing-library/react";

import { dummyProps } from "../helpers";
import Post from "../../Post";

describe("Unit Tests: Post", () => {
  describe("tl;dr", () => {
    describe("events [#event]", () => {
      // >>> HOVER-LIKE EVENTS >>>
      describe("hover like", () => {
        // +++ prior +++
        it("shouldn't display before onMouseEnter [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
          });

          expect(result!.getByText("test tl;dr")).not.toBeVisible();
        });

        // +++ enter +++
        it("should display after onMouseEnter [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
            fireEvent.mouseEnter(result.getByTestId("post"));
          });

          expect(result!.getByText("test tl;dr")).toBeVisible();
        });

        // +++ exit +++
        it("shouldn't display after onMouseLeave [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
            fireEvent.mouseEnter(result.getByTestId("post"));
            fireEvent.mouseLeave(result.getByTestId("post"));
          });

          expect(result!.getByText("test tl;dr")).not.toBeVisible();
        });

        // +++ click open, mouse leave +++
        it("shouldn't display after onClick (open) then onMouseLeave [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
            fireEvent.click(result.getByTestId("post"));
            fireEvent.mouseLeave(result.getByTestId("post"));
          });

          expect(result!.getByText("test tl;dr")).not.toBeVisible();
        });

        // +++ mouse enter, click close +++
        it("shouldn't display after onMouseEnter, then onClick (close) [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
            fireEvent.mouseEnter(result.getByTestId("post"));
            fireEvent.click(result.getByTestId("tldr-close-button"));
          });

          expect(result!.getByText("test tl;dr")).not.toBeVisible();
        });
      });

      // >>> CLICK EVENTS >>>
      describe("click", () => {
        // +++ click open +++
        it("should display after onClick (open) [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
            fireEvent.click(result.getByTestId("post"));
          });

          expect(result!.getByText("test tl;dr")).toBeVisible();
        });

        // +++ click close +++
        it("shouldn't display after onClick (close) [#event]", () => {
          let result: RenderResult;

          act(() => {
            result = render(<Post {...dummyProps} tldr="test tl;dr" />);
            fireEvent.click(result.getByTestId("post"));
            fireEvent.click(result.getByTestId("tldr-close-button"));
          });

          expect(result!.getByText("test tl;dr")).not.toBeVisible();
        });
      });
    });
  });
});
