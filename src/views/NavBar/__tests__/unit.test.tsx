import "@testing-library/jest-dom/extend-expect";

import { renderNavBar } from "./helpers";
import { fireEvent } from "@testing-library/dom";

describe("unit tests: NavBar", () => {
  // ~~~ render ~~~
  it("should render three items, when given three [#render]", async () => {
    const result = renderNavBar({
      items: [
        { path: "#", text: "test item" },
        { path: "#", text: "test item" },
        { path: "#", text: "test item" },
      ],
    });

    expect(await result.findAllByText("test item")).toHaveLength(3);
  });

  // ~~~ routeHandler ~~~
  describe("routeHandler", () => {
    it("should return the correct path when clicked [#event,#route]", async () => {
      const routeHandlerSpy = jest.fn();
      const items = [
        { path: "/path0", text: "test item 0" },
        { path: "/path1", text: "test item 1" },
        { path: "/path2", text: "test item 2" },
      ];

      const text = (index: number) => items[index].text;
      const path = (index: number) => items[index].path;
      const arg = (index: number) => routeHandlerSpy.mock.calls[index][0];

      const result = renderNavBar({
        items,
        routeHandler: routeHandlerSpy,
      });
      const itemElements = await result.findAllByText(/^test item/);

      expect(itemElements).toHaveLength(3); // defensive
      itemElements.forEach((elem, index) => {
        fireEvent.click(elem);
        expect(elem).toHaveTextContent(text(index)); // ensure correct item first
        expect(arg(index)).toBe(path(index)); // check arg matches item
      });
    });

    it("should be called only once per click [#event,#route]", async () => {
      const routeHandlerSpy = jest.fn();
      const items = [
        { path: "/path0", text: "test item 0" },
        { path: "/path1", text: "test item 1" },
        { path: "/path2", text: "test item 2" },
      ];

      const calls = (index: number) => routeHandlerSpy.mock.calls[index].length;

      const result = renderNavBar({
        items,
        routeHandler: routeHandlerSpy,
      });
      const itemElements = await result.findAllByText(/^test item/);

      expect(itemElements).toHaveLength(3); // defensive
      itemElements.forEach((elem, index) => {
        fireEvent.click(elem);
        expect(calls(index)).toBe(1);
      });
    });
  });
});
