import "@testing-library/jest-dom/extend-expect";

import { testids, labels, renderSubmitPost } from "./helpers";

describe("smoke tests: SubmitPost", () => {
  // ~~~ Containers ~~~
  describe("containers", () => {
    [testids.root, testids.form, testids.preview.wrapper].forEach((testid) => {
      it(`should render "${testid}". [#render]`, () => {
        const result = renderSubmitPost();
        expect(result.getByTestId(testid)).toBeVisible();
      });
    });
  });

  // ~~~ Input Fields ~~~
  describe("input fields", () => {
    [
      { label: labels.body, reLabel: labels.reBody },
      { label: labels.title, reLabel: labels.reTitle },
      { label: labels.tldr, reLabel: labels.reTldr },
    ].forEach(({ label, reLabel }) => {
      it(`should render the component with the label: "${label}". [#render]`, () => {
        const result = renderSubmitPost();
        expect(result.getByLabelText(reLabel)).toBeVisible();
      });
    });
  });
});
