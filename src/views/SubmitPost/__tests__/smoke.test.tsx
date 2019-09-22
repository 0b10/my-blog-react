import "@testing-library/jest-dom/extend-expect";

import { FileAttachmentButtons } from "../Form";
import { testids, labels, renderSubmitPost, elementText } from "./helpers";

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

  describe("updload buttons", () => {
    type Fixtures = Readonly<{
      field: keyof FileAttachmentButtons<void>;
      reElementText: RegExp;
    }>;

    const fixtures: FileAttachmentButtons<Fixtures> = Object.freeze({
      headerImage: {
        // ! The button text is hidden at xs breakpoint, so requires initialWidth="xl" prop
        field: "headerImage",
        reElementText: elementText.reAttachHeaderImage,
      },
    });

    Object.values(fixtures).forEach(({ field, reElementText }: Fixtures) => {
      describe(`the attach ${field} button`, () => {
        it("should render, and be visible", async () => {
          const result = renderSubmitPost();
          const button = result.getByText(reElementText);

          expect(button).toBeVisible();
        });
      });
    });
  });
});
