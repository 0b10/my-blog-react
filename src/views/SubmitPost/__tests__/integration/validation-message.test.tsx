import "@testing-library/jest-dom/extend-expect";
import { fireEvent, within } from "@testing-library/react";

import {
  elementText,
  labels,
  renderSubmitPost,
  repeatChars,
  testids,
  validationValues,
} from "../helpers";
import { ValidatedButtons, ValidatedTextFields } from "views/SubmitPost/Form";

describe("integration tests: SubmitPost", () => {
  describe("validation error message", () => {
    // >>> TEST FIELDS >>>
    describe("text fields", () => {
      const {
        body: bodyTestid,
        headerImageAlt: headerImageAltTestid,
        title: titleTestid,
        tldr: tldrTestid,
      } = testids.validation.message;

      type Fixtures = Readonly<{
        fieldDescription: keyof ValidatedTextFields<void>;
        inputValues: {
          readonly min: string;
          readonly max?: string;
        };
        label: RegExp;
        message: string;
        requiredMessage: string;
        testid: string;
      }>;

      // ~~~ Fixtures ~~~
      const fixtures: ValidatedTextFields<Fixtures> = Object.freeze({
        body: {
          fieldDescription: "body",
          inputValues: {
            min: repeatChars("body", "min", -1),
          },
          label: labels.reBody,
          message: validationValues.body.min.message,
          requiredMessage: validationValues.body.required.message,
          testid: bodyTestid,
        },
        headerImageAlt: {
          fieldDescription: "headerImageAlt",
          inputValues: {
            min: repeatChars("headerImageAlt", "min", -1),
          },
          label: labels.reHeaderImgAlt,
          message: validationValues.headerImageAlt.min.message,
          requiredMessage: validationValues.headerImageAlt.required.message,
          testid: headerImageAltTestid,
        },
        title: {
          fieldDescription: "title",
          inputValues: {
            min: repeatChars("title", "min", -1),
          },
          label: labels.reTitle,
          message: validationValues.title.min.message,
          requiredMessage: validationValues.title.required.message,
          testid: titleTestid,
        },
        tldr: {
          fieldDescription: "tldr",
          inputValues: {
            min: repeatChars("tldr", "min", -1),
          },
          label: labels.reTldr,
          message: validationValues.tldr.min.message,
          requiredMessage: validationValues.tldr.required.message,
          testid: tldrTestid,
        },
      });

      // ~~~ Tests ~~~
      Object.values(fixtures).forEach(
        ({ fieldDescription, label, message, requiredMessage, testid, inputValues }: Fixtures) => {
          describe(`for the "${fieldDescription}" field. [#input,#validation]`, () => {
            // +++ value and location +++
            it(`should display the correct message in the correct place`, async () => {
              const reMessage = RegExp(`^${message}$`);
              const result = renderSubmitPost();

              fireEvent.change(result.getByLabelText(label), {
                target: { value: inputValues.min },
              });
              fireEvent.blur(result.getByLabelText(label)); // initial validation requires a blur

              const errorField = result.getByTestId(testid);
              expect(await within(errorField).findByText(reMessage)).toBeVisible();
            });

            // +++ no duplicate message +++
            it(`should display the message only once throughout the document`, async () => {
              const reMessage = RegExp(`^${message}$`);
              const result = renderSubmitPost();

              fireEvent.change(result.getByLabelText(label), {
                target: { value: inputValues.min },
              });
              fireEvent.blur(result.getByLabelText(label)); // initial validation requires a blur

              expect(await result.findAllByText(reMessage)).toHaveLength(1);
            });

            // +++ untouched, no message +++
            it(`should display no message if nothing has yet been input`, () => {
              const reMessage = RegExp(`^${message}$`);
              const result = renderSubmitPost();

              expect(result.queryAllByText(reMessage)).toHaveLength(0);
            });

            // +++ must be touched first +++
            it(`shouldn't validate initially, until a blur event has occured`, async () => {
              const reMessage = RegExp(`^${message}$`);
              const result = renderSubmitPost();

              // No blur
              fireEvent.change(result.getByLabelText(label), {
                target: { value: inputValues.min },
              });
              expect(result.queryByText(reMessage)).toBeNull();

              // Then blur
              fireEvent.blur(result.getByLabelText(label));
              const errorField = result.getByTestId(testid);
              expect(await within(errorField).findByText(reMessage)).toBeVisible();
            });

            // +++ blur then onChange +++
            it(`should display a message onChange, after onBlur has occurred`, async () => {
              const reMessage = RegExp(`^${requiredMessage}$`);
              const result = renderSubmitPost();

              // change -> blur -> change === change message
              fireEvent.change(result.getByLabelText(label), {
                target: { value: inputValues.min },
              });
              fireEvent.blur(result.getByLabelText(label));
              fireEvent.change(result.getByLabelText(label), { target: { value: "" } }); // expect required

              const errorField = result.getByTestId(testid);
              expect(await within(errorField).findByText(reMessage)).toBeVisible();
            });
          });
        }
      );
    });

    // >>> ATTACHED FILES >>>
    describe("attached files", () => {
      type Fixtures = Readonly<{
        fieldDescription: keyof ValidatedButtons<void>;
        file: File;
        inputTestId: string;
        requiredMessage: string;
        validationErrorMessage: string;
        validationMessageTestId: string;
      }>;

      // ~~~ Fixtures ~~~
      const fixtures: ValidatedButtons<Fixtures> = Object.freeze({
        headerImage: {
          fieldDescription: "headerImage",
          file: new File(["dummy-data"], "dummy-file-png", { type: "image/invalid" }),
          inputTestId: testids.input.headerImage,
          requiredMessage: validationValues.headerImageAlt.required.message,
          validationErrorMessage: validationValues.headerImage.fileType.message,
          validationMessageTestId: testids.validation.message.headerImgFile,
        },
      });

      // ~~~ Tests ~~~
      Object.values(fixtures).forEach(
        ({
          fieldDescription,
          file,
          inputTestId,
          requiredMessage,
          validationErrorMessage,
          validationMessageTestId,
        }: Fixtures) => {
          describe(`for the "${fieldDescription}" field. [#input,#validation]`, () => {
            // +++ value and location +++
            it("should display the correct message in the correct place", async () => {
              const reMessage = RegExp(`^${validationErrorMessage}$`);
              const result = renderSubmitPost();
              const inputElement = result.getByTestId(inputTestId);
              const validationMessageElement = result.getByTestId(validationMessageTestId);

              fireEvent.change(inputElement, { target: { files: [file] } });
              fireEvent.blur(inputElement); // initial validation requires a blur

              expect(await within(validationMessageElement).findByText(reMessage)).toBeVisible();
            });

            // +++ no duplicate message +++
            it(`should display the message only once throughout the document`, async () => {
              const reMessage = RegExp(`^${validationErrorMessage}$`);
              const result = renderSubmitPost();
              const inputElement = result.getByTestId(inputTestId);

              fireEvent.change(inputElement, { target: { files: [file] } });
              fireEvent.blur(inputElement); // initial validation requires a blur

              expect(await result.findAllByText(reMessage)).toHaveLength(1);
            });

            // +++ untouched, no message +++
            it(`should display no message if nothing has yet been input`, () => {
              const reMessage = RegExp(`^${validationErrorMessage}$`);
              const result = renderSubmitPost();

              expect(result.queryAllByText(reMessage)).toHaveLength(0);
            });

            // +++ required +++
            it(`should display display a required message when nothing is attached`, async () => {
              // This is primarily just to test that another error message is possible
              const reMessage = RegExp(`^${requiredMessage}$`);
              const result = renderSubmitPost();
              const submitButton = result.getByText(elementText.reSubmit);
              const validationMessageElement = result.getByTestId(validationMessageTestId);

              fireEvent.click(submitButton);

              const message = await within(validationMessageElement).findByText(reMessage);
              expect(message).toBeVisible();
            });
          });
        }
      );
    });
  });
});
