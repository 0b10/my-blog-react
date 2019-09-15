import "@testing-library/jest-dom/extend-expect";

import { renderNavBar } from "./helpers";

describe("smoke tests: NavBar", () => {
  it("should render [#render]", async () => {
    const result = renderNavBar();

    expect(await result.findByTestId("navbar")).toBeVisible();
  });

  it("should render only once [#render]", async () => {
    const result = renderNavBar();

    expect(await result.findAllByTestId("navbar")).toHaveLength(1);
  });
});
