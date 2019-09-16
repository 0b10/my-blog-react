import "@testing-library/jest-dom/extend-expect";

import { fireEvent, waitForDomChange, within } from "@testing-library/react";

import { ISubmitPostInputFields } from "../../Form";
import { labels, renderSubmitPost, testids } from "../helpers";

describe("integration tests: SubmitPost", () => {
  describe("onReset [#event,#form]", () => {
    interface IOnResetTestData {
      readonly input: string;
      readonly labelRegex: RegExp;
      readonly name: keyof ISubmitPostInputFields<string>;
      readonly validationMsgTestId: string;
    }

    const testCases: ISubmitPostInputFields<IOnResetTestData> = Object.freeze({
      title: {
        input: "test title",
        labelRegex: labels.reTitle,
        name: "title",
        validationMsgTestId: testids.validation.message.title,
      },
      tldr: {
        input: "test tldr",
        labelRegex: labels.reTldr,
        name: "tldr",
        validationMsgTestId: testids.validation.message.tldr,
      },
      body: {
        input: "test body",
        labelRegex: labels.reBody,
        name: "body",
        validationMsgTestId: testids.validation.message.body,
      },
    });

    Object.values(testCases).forEach(
      ({ name, input, labelRegex, validationMsgTestId }: IOnResetTestData) => {
        describe(`for the ${name} field`, () => {
          it("should not render anything in the corresponding input in the preview field", async () => {
            // ! BUG(FIXED) jsdom 15.1.1 required: jsdom/jsdom:#2387 and sharegate/craco#108
            const reInput = RegExp(`^${input}$`);
            const result = renderSubmitPost();
            const inputField = result.getByLabelText(labelRegex);
            const preview = result.getByTestId(testids.preview.wrapper);
            const resetButton = result.getByText(/^Reset$/);

            fireEvent.change(inputField, { target: { value: input } });
            expect(await within(preview).findByText(reInput)).toBeVisible(); // defensive, check text exists first
            fireEvent.click(resetButton);

            expect(preview).not.toHaveTextContent(reInput);
          });

          it("should not render anything in the corresponding validation error message field", async () => {
            const result = renderSubmitPost();
            const errorField = result.getByTestId(validationMsgTestId);
            const inputField = result.getByLabelText(labelRegex);
            const resetButton = result.getByText(/^Reset$/);

            // focus => blur === `touched` && "Required" message
            fireEvent.focus(inputField);
            fireEvent.blur(inputField);
            await waitForDomChange({ container: inputField });
            expect(errorField).toHaveTextContent(/.+/); // Check that a message exists first
            fireEvent.click(resetButton);

            expect(errorField).toHaveTextContent(/^$/);
          });
        });
      }
    );
  });
});
