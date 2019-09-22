import "@testing-library/jest-dom/extend-expect";

import { fireEvent, waitForDomChange, within } from "@testing-library/react";

import { elementText, labels, renderSubmitPost, testids, validationValues } from "../helpers";
import { PreviewedAttachments, PreviewedTextFields, ValidatedTextFields } from "../../Form";

// ! BUG(FIXED) jsdom 15.1.1 required for a working reset: jsdom/jsdom:#2387 and sharegate/craco#108

describe("integration tests: SubmitPost", () => {
  describe("onReset (after reset has occurred) [#event,#form]", () => {
    // >>> PREVIEW WINDOW >>>
    describe("the preview window", () => {
      // ~~~ Text Field Preview ~~~
      describe("text fields", () => {
        type Fixtures = Readonly<{
          input: string;
          labelRegex: RegExp;
          name: keyof PreviewedTextFields<string>;
        }>;

        const fixtures: PreviewedTextFields<Fixtures> = Object.freeze({
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

        Object.values(fixtures).forEach(({ name, input, labelRegex }: Fixtures) => {
          describe(`for the "${name}" field`, () => {
            it("should not render anything in the corresponding preview field", async () => {
              const reInput = RegExp(`^${input}$`);
              const result = renderSubmitPost();
              const inputField = result.getByLabelText(labelRegex);
              const preview = result.getByTestId(testids.preview.wrapper);
              const resetButton = result.getByText(elementText.reReset);

              fireEvent.change(inputField, { target: { value: input } });
              expect(await within(preview).findByText(reInput)).toBeVisible(); // defensive, check text exists first
              fireEvent.click(resetButton);

              expect(preview).not.toHaveTextContent(reInput);
            });
          });
        });
      });

      // ~~~ Attached File Preview ~~~
      describe("file attachments", () => {
        type Fixtures = Readonly<{
          file: File;
          inputTestId: string;
          name: keyof PreviewedAttachments<string>;
          previewTestId: string;
        }>;

        const fixtures: PreviewedAttachments<Fixtures> = Object.freeze({
          headerImage: {
            file: new File(["dummy-data"], "fake-file-name.png", { type: "image/png" }),
            inputTestId: testids.input.headerImage,
            name: "headerImage",
            previewTestId: testids.preview.headerImage,
          },
        });

        Object.values(fixtures).forEach(({ file, inputTestId, name, previewTestId }: Fixtures) => {
          describe(`for the "${name}" input`, () => {
            it("should not render anything in the corresponding preview field", async () => {
              // * Assumption: after the form is reset, the preview element isn't rendered in the
              // *  DOM at all - use a fake component to make this happen. See helpers.
              const result = renderSubmitPost();
              const inputField = result.getByTestId(inputTestId);
              const resetButton = result.getByText(elementText.reReset);

              fireEvent.change(inputField, { target: { files: [file] } });
              const filePreview = await result.findByTestId(previewTestId);
              expect(filePreview).toBeVisible();
              fireEvent.click(resetButton);

              expect(result.queryByTestId(previewTestId)).toBeNull();
            });
          });
        });
      });
    });

    // >>> VALIDATION MESSAGES >>>
    describe("validation messages", () => {
      // ! There's not much point in testing various input values, as that will just be testing the
      // !  schema set up for tests, instead, just test that a validaiton message is rendered. Save
      // !  the more involved tests for components that implement more complex logic (like input file
      // !  / formik - which was tricky, and uses some custom logic)

      // ~~~ Text Field Validation Messages ~~~
      describe("text fields", () => {
        type Fixtures = Readonly<{
          labelRegex: RegExp;
          name: keyof ValidatedTextFields<string>;
          validationMsgTestId: string;
        }>;

        const fixtures: ValidatedTextFields<Fixtures> = Object.freeze({
          body: {
            labelRegex: labels.reBody,
            name: "body",
            validationMsgTestId: testids.validation.message.body,
          },
          headerImageAlt: {
            labelRegex: labels.reHeaderImgAlt,
            name: "headerImageAlt",
            validationMsgTestId: testids.validation.message.headerImageAlt,
          },
          title: {
            labelRegex: labels.reTitle,
            name: "title",
            validationMsgTestId: testids.validation.message.title,
          },
          tldr: {
            labelRegex: labels.reTldr,
            name: "tldr",
            validationMsgTestId: testids.validation.message.tldr,
          },
        });

        Object.values(fixtures).forEach(({ name, labelRegex, validationMsgTestId }: Fixtures) => {
          describe(`for the "${name}" field`, () => {
            it("should not render anything in the corresponding validation error message field", async () => {
              const result = renderSubmitPost();
              const errorField = result.getByTestId(validationMsgTestId);
              const inputField = result.getByLabelText(labelRegex);
              const resetButton = result.getByText(elementText.reReset);

              // focus => blur === `touched` && "Required" message
              fireEvent.focus(inputField);
              fireEvent.blur(inputField);
              await waitForDomChange({ container: inputField });
              expect(errorField).toHaveTextContent(/.+/); // Check that a message exists first
              fireEvent.click(resetButton);

              expect(errorField).toHaveTextContent(/^$/);
            });
          });
        });
      });

      // ~~~ Attached File Validation Message ~~~
      describe("file attachments", () => {
        type Fixtures = Readonly<{
          file: File;
          inputTestId: string;
          name: keyof PreviewedAttachments<string>;
          reValidationMessage: RegExp;
          validationMessageTestId: string;
        }>;

        const fixtures: PreviewedAttachments<Fixtures> = Object.freeze({
          headerImage: {
            file: new File(["dummy-data"], "fake-file-name.png", { type: "image/invalid" }),
            inputTestId: testids.input.headerImage,
            name: "headerImage",
            reValidationMessage: RegExp(`^${validationValues.headerImage.fileType.message}$`),
            validationMessageTestId: testids.validation.message.headerImgFile,
          },
        });

        Object.values(fixtures).forEach(
          ({ file, inputTestId, name, reValidationMessage, validationMessageTestId }: Fixtures) => {
            describe(`for the "${name}" input`, () => {
              it("should not render a validation message", async () => {
                const result = renderSubmitPost();
                const inputField = result.getByTestId(inputTestId);
                const resetButton = result.getByText(elementText.reReset);
                const validationMessageElement = result.getByTestId(validationMessageTestId);

                fireEvent.change(inputField, { target: { files: [file] } });
                fireEvent.blur(inputField); // Must blur, to invoke validation message
                await waitForDomChange({ container: validationMessageElement });
                expect(validationMessageElement).toHaveTextContent(reValidationMessage);
                fireEvent.click(resetButton);

                expect(validationMessageElement).toHaveTextContent(/^$/);
              });
            });
          }
        );
      });
    });
  });
});
