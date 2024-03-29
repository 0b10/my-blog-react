import "@testing-library/jest-dom/extend-expect";

import { renderSubmitPost, testids } from "../helpers";
import { InitialWidth } from "../../types";

describe("integration tests: SubmitPost", () => {
  describe("responsiveness. [#breakpoints,#render,#responsive]", () => {
    // ~~~ Visible ~~~
    const visibleBP: InitialWidth[] = ["md", "lg", "xl"];

    visibleBP.forEach((breakpoint) => {
      describe(`when the breakpoint is set to "${breakpoint}"`, () => {
        it(`should render the Preview component`, async () => {
          const result = renderSubmitPost(breakpoint);
          const testid = testids.preview.wrapper;

          expect(result.queryAllByTestId(testid)).toHaveLength(1);
        });
      });
    });

    // ~~~ Not Visible ~~~
    const notVisibleBP: InitialWidth[] = ["xs", "sm"];

    notVisibleBP.forEach((breakpoint) => {
      describe(`when the breakpoint is set to "${breakpoint}"`, () => {
        it(`should not render the Preview component`, async () => {
          const result = renderSubmitPost(breakpoint);
          const testid = testids.preview.wrapper;

          expect(result.queryAllByTestId(testid)).toHaveLength(0);
        });
      });
    });
  });
});
