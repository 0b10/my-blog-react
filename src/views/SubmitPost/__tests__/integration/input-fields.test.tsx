import "@testing-library/jest-dom/extend-expect";

import { fireEvent } from "@testing-library/react";

import { labels, renderSubmitPost, testids } from "../helpers";
import { ISubmitPostInputFields } from "../../Form";

describe("integration tests: SubmitPost", () => {
  describe("input fields", () => {
    describe("onChange [#event]", () => {
      const { body: bodyTestid, title: titleTestid, tldr: tldrTestid } = testids.preview;

      interface ITestData {
        readonly field: keyof ISubmitPostInputFields<never>;
        readonly previewTestid: string;
        readonly reLabel: RegExp;
        readonly value: string;
      }

      const testCases: ISubmitPostInputFields<ITestData> = Object.freeze({
        title: {
          field: "title",
          previewTestid: titleTestid,
          reLabel: labels.reTitle,
          value: "test title",
        },
        tldr: {
          field: "tldr",
          previewTestid: tldrTestid,
          reLabel: labels.reTldr,
          value: "test tldr",
        },
        body: {
          field: "body",
          previewTestid: bodyTestid,
          reLabel: labels.reBody,
          value: "test body",
        },
      });

      Object.values(testCases).forEach(({ reLabel, value, previewTestid, field }: ITestData) => {
        describe(`when "${value}" is entered into the "${field}" input field`, () => {
          it(`should render "${value}" in the preview field: "${previewTestid}"`, () => {
            const reValue = RegExp(`^${value}$`);
            const result = renderSubmitPost();

            fireEvent.change(result.getByLabelText(reLabel), { target: { value } });

            expect(result.getByTestId(previewTestid)).toHaveTextContent(reValue);
          });
        });
      });
    });
  });
});
