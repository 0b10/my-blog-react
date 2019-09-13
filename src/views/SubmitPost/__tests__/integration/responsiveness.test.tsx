import "@testing-library/jest-dom/extend-expect";

import { renderSubmitPost, testids } from "../helpers";
import { TInitialWidth } from "../../";

describe("Integration Tests: SubmitPost", () => {
  describe("responsiveness. [#breakpoints,#render,#responsive]", () => {
    interface ITestData {
      readonly breakpoint: TInitialWidth;
      readonly visible: boolean;
    }

    const testCases: ITestData[] = [
      { breakpoint: "xs", visible: false },
      { breakpoint: "sm", visible: false },
      { breakpoint: "md", visible: true },
      { breakpoint: "lg", visible: true },
      { breakpoint: "xl", visible: true }
    ];

    testCases.forEach(({ breakpoint, visible }: ITestData) => {
      describe(`when the breakpoint is set to "${breakpoint}"`, () => {
        it(`should ${visible ? "" : "not "}render the Preview component`, async () => {
          const result = renderSubmitPost(breakpoint);
          const testid = testids.preview.wrapper;
          const numPreviewElems = visible ? 1 : 0;

          expect(result.queryAllByTestId(testid)).toHaveLength(numPreviewElems);
        });
      });
    });
  });
});
