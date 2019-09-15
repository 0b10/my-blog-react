import "@testing-library/jest-dom/extend-expect";

import { fireEvent, within } from "@testing-library/react";

import { labels, renderSubmitPost, testids } from "../helpers";
import { ISubmitPostInputFields } from "../../Form";

describe("integration tests: SubmitPost", () => {
  describe("onReset [#event,#form]", () => {
    interface IOnResetTestData {
      readonly input: string;
      readonly labelRegex: RegExp;
      readonly name: keyof ISubmitPostInputFields<string>;
    }

    const testCases: ISubmitPostInputFields<IOnResetTestData> = Object.freeze({
      title: {
        input: "test title",
        labelRegex: labels.reTitle,
        name: "title",
      },
      tldr: {
        input: "test tldr",
        labelRegex: labels.reTldr,
        name: "tldr",
      },
      body: {
        input: "test body",
        labelRegex: labels.reBody,
        name: "body",
      },
    });

    Object.values(testCases).forEach(({ name, input, labelRegex }: IOnResetTestData) => {
      describe(`for the ${name} field`, () => {
        // TODO: [#test] also test that the error message fields are also reset
        it.skip("should not render in the preview field", async () => {
          // BUG: jsdom 15.1.1 required: jsdom/jsdom:#2387 and sharegate/craco#108
          // ! override jest config : testEnvironment with craco, using
          // !  jest-environment-jsdom-fifteen when issues are fixed
          const reInput = RegExp(`^${input}$`);
          const result = renderSubmitPost();

          fireEvent.change(result.getByLabelText(labelRegex), { target: { value: input } });
          const preview = result.getByTestId(testids.preview.wrapper);
          expect(await within(preview).findByText(reInput)).toBeVisible(); // defensive, check text exists first
          fireEvent.click(result.getByText(/^Reset$/));

          expect(preview).not.toHaveTextContent(reInput);
        });
      });
    });
  });
});
