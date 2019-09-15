import "@testing-library/jest-dom/extend-expect";
import { fireEvent, within } from "@testing-library/react";

import {
  defaultValidationSchema,
  labels,
  renderSubmitPost,
  repeatChars,
  testids,
  validationValues,
} from "../helpers";
import { ISubmitPostInputFields } from "views/SubmitPost/Form";

describe("integration tests: SubmitPost", () => {
  describe("validation error message", () => {
    const { body: bodyTestid, title: titleTestid, tldr: tldrTestid } = testids.validation.message;

    interface ITestData {
      readonly field: keyof ISubmitPostInputFields<never>;
      readonly inputValues: {
        readonly min: string;
        readonly max?: string;
      };
      readonly label: RegExp;
      readonly message: string;
      readonly requiredMessage: string;
      readonly testid: string;
    }

    const testCases: ISubmitPostInputFields<ITestData> = Object.freeze({
      body: {
        field: "body",
        inputValues: {
          min: repeatChars("body", "min", -1),
        },
        label: labels.reBody,
        message: validationValues.body.min.message,
        requiredMessage: validationValues.body.required.message,
        testid: bodyTestid,
      },
      title: {
        field: "title",
        inputValues: {
          min: repeatChars("title", "min", -1),
        },
        label: labels.reTitle,
        message: validationValues.title.min.message,
        requiredMessage: validationValues.title.required.message,
        testid: titleTestid,
      },
      tldr: {
        field: "tldr",
        inputValues: {
          min: repeatChars("tldr", "min", -1),
        },
        label: labels.reTldr,
        message: validationValues.tldr.min.message,
        requiredMessage: validationValues.tldr.required.message,
        testid: tldrTestid,
      },
    });

    Object.values(testCases).forEach(
      ({ field, label, message, requiredMessage, testid, inputValues }: ITestData) => {
        describe(`for the "${field}" field. [#input,#validation]`, () => {
          // +++ value and location +++
          it(`should display the correct message in the correct place`, async () => {
            const reMessage = RegExp(`^${message}$`);
            const result = renderSubmitPost(undefined, defaultValidationSchema);

            fireEvent.change(result.getByLabelText(label), { target: { value: inputValues.min } });
            fireEvent.blur(result.getByLabelText(label)); // initial validation requires a blur

            const errorField = result.getByTestId(testid);
            expect(await within(errorField).findByText(reMessage)).toBeVisible();
          });

          // +++ no duplicate message +++
          it(`should display the message only once throughout the document`, async () => {
            const reMessage = RegExp(`^${message}$`);
            const result = renderSubmitPost(undefined, defaultValidationSchema);

            fireEvent.change(result.getByLabelText(label), { target: { value: inputValues.min } });
            fireEvent.blur(result.getByLabelText(label)); // initial validation requires a blur

            expect(await result.findAllByText(reMessage)).toHaveLength(1);
          });

          // +++ untouched, no message +++
          it(`should display no message if nothing has yet been input`, () => {
            const reMessage = RegExp(`^${message}$`);
            const result = renderSubmitPost(undefined, defaultValidationSchema);

            expect(result.queryAllByText(reMessage)).toHaveLength(0);
          });

          // +++ must be touched first +++
          it(`shouldn't validate initially, until a blur event has occured`, async () => {
            const reMessage = RegExp(`^${message}$`);
            const result = renderSubmitPost(undefined, defaultValidationSchema);

            // No blur
            fireEvent.change(result.getByLabelText(label), { target: { value: inputValues.min } });
            expect(result.queryByText(reMessage)).toBeNull();

            // Then blur
            fireEvent.blur(result.getByLabelText(label));
            const errorField = result.getByTestId(testid);
            expect(await within(errorField).findByText(reMessage)).toBeVisible();
          });

          // +++ blur then onChange +++
          it(`should display a message onChange, after onBlur has occurred`, async () => {
            const reMessage = RegExp(`^${requiredMessage}$`);
            const result = renderSubmitPost(undefined, defaultValidationSchema);

            // change -> blur -> change === change message
            fireEvent.change(result.getByLabelText(label), { target: { value: inputValues.min } });
            fireEvent.blur(result.getByLabelText(label));
            fireEvent.change(result.getByLabelText(label), { target: { value: "" } }); // expect required

            const errorField = result.getByTestId(testid);
            expect(await within(errorField).findByText(reMessage)).toBeVisible();
          });
        });
      }
    );
  });
});
