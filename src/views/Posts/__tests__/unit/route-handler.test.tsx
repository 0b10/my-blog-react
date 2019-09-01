import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { act, fireEvent, render, RenderResult } from "@testing-library/react";

import { dummyProps } from "../helpers";
import Post from "../../Post";

describe("#unit tests: Post", () => {
  describe("routerHandler", () => {
    describe("clicking on the TL;DR section #route [#event]", () => {
      it("should call the routeHandler [#event]", () => {
        let result: RenderResult;
        const routeHandlerSpy = jest.fn();
        const fakeId = "1";

        act(() => {
          result = render(
            <Post {...dummyProps} tldr="test tl;dr" id={fakeId} routeHandler={routeHandlerSpy} />
          );
          fireEvent.click(result.getByTestId("post")); // Open tl;dr
        });
        fireEvent.click(result!.getByText("test tl;dr"));

        expect(routeHandlerSpy.mock.calls.length).toBe(1);
      });

      it("should call the routeHandler with the correct args [#event]", () => {
        let result: RenderResult;
        const routeHandlerSpy = jest.fn();
        const fakeId = "1";

        act(() => {
          result = render(
            <Post {...dummyProps} tldr="test tl;dr" id={fakeId} routeHandler={routeHandlerSpy} />
          );
          fireEvent.click(result.getByTestId("post")); // Open tl;dr
        });
        fireEvent.click(result!.getByText("test tl;dr"));

        expect(routeHandlerSpy.mock.calls[0][0]).toBe(fakeId);
      });
    });

    describe("clicking on the 'read' post icon #route [#event]", () => {
      it("should call the routeHandler [#event]", () => {
        let result: RenderResult;
        const routeHandlerSpy = jest.fn();
        const fakeId = "1";

        act(() => {
          result = render(
            <Post {...dummyProps} tldr="test tl;dr" id={fakeId} routeHandler={routeHandlerSpy} />
          );
          fireEvent.click(result.getByTestId("post")); // Open tl;dr
        });
        fireEvent.click(result!.getByTestId("read-post-icon"));

        expect(routeHandlerSpy.mock.calls.length).toBe(1);
      });

      it("should call the routeHandler with the correct args [#event]", () => {
        let result: RenderResult;
        const routeHandlerSpy = jest.fn();
        const fakeId = "1";

        act(() => {
          result = render(
            <Post {...dummyProps} tldr="test tl;dr" id={fakeId} routeHandler={routeHandlerSpy} />
          );
          fireEvent.click(result.getByTestId("post")); // Open tl;dr
        });
        fireEvent.click(result!.getByTestId("read-post-icon"));

        expect(routeHandlerSpy.mock.calls[0][0]).toBe(fakeId);
      });
    });
  });
});
