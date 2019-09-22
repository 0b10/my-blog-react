import "@testing-library/jest-dom/extend-expect";

import { fireEvent } from "@testing-library/react";

import { labels, renderSubmitPost, testids } from "../helpers";
import { PreviewedTextFields, PreviewedImages } from "../../Form";

describe("integration tests: SubmitPost", () => {
  describe("previewed fields", () => {
    // >>> TEXT FIELDS >>>
    describe("text fields", () => {
      type Fixtures = Readonly<{
        field: keyof PreviewedTextFields<void>;
        previewTestid: string;
        reLabel: RegExp;
        value: string;
      }>;

      const fixtures: PreviewedTextFields<Fixtures> = Object.freeze({
        title: {
          field: "title",
          previewTestid: testids.preview.title,
          reLabel: labels.reTitle,
          value: "test title",
        },
        tldr: {
          field: "tldr",
          previewTestid: testids.preview.tldr,
          reLabel: labels.reTldr,
          value: "test tldr",
        },
        body: {
          field: "body",
          previewTestid: testids.preview.body,
          reLabel: labels.reBody,
          value: "test body",
        },
      });

      Object.values(fixtures).forEach(({ reLabel, value, previewTestid, field }: Fixtures) => {
        describe(`when "${value}" is entered into the "${field}" text field`, () => {
          it(`should render "${value}" in the preview field: "${previewTestid}"`, () => {
            const reValue = RegExp(`^${value}$`);
            const result = renderSubmitPost();

            fireEvent.change(result.getByLabelText(reLabel), { target: { value } });

            expect(result.getByTestId(previewTestid)).toHaveTextContent(reValue);
          });
        });
      });
    });

    // >>> ATTACHMENT BUTTONS >>>
    describe("updload buttons", () => {
      type Fixtures = Readonly<{
        // An optional array of tuples that describe element attributes: [[k, v], [attribute, value]]
        // things like images are hard to test, provide some expected attributes that confirms expected behaviour
        // ! this assumes that previewTestId points directly to the element that has these props
        attributes: Array<[string, string]>;

        field: keyof PreviewedImages<void>; // just a descriptive name
        file: File; // the attached file
        inputTestId: string; // testid for: <input type="file" />
        reImageAltInputLabel: RegExp;
        previewTestId: string; // the element that displays the file. Must not render when not in use
      }>;

      const fixtures: PreviewedImages<Fixtures> = Object.freeze({
        headerImage: {
          attributes: [["src", "data:image/png;base64,ZHVtbXktZGF0YQ=="], ["alt", ""]],
          field: "headerImage",
          file: new File(["dummy-data"], "dummy-file-png", { type: "image/png" }),
          inputTestId: testids.input.headerImage,
          reImageAltInputLabel: labels.reHeaderImgAlt,
          previewTestId: testids.preview.headerImage,
        },
      });

      /**
       * Essentially testing that the file details are injected into the supplied preview component.
       */
      Object.values(fixtures).forEach(
        ({
          attributes,
          field,
          file,
          inputTestId,
          previewTestId,
          reImageAltInputLabel,
        }: Fixtures) => {
          describe(`the attached ${field} file: ${file.name}`, () => {
            // +++ is visible +++
            it(`should be displayed in the preview component`, async () => {
              // * Assumption: the file display element isn't rendered until it's used, see whatever
              // *  component is reponsible for rendering - at the time of writing it was FakePreview
              // *  in the local helpers module
              const result = renderSubmitPost();
              const inputElement = result.getByTestId(inputTestId);
              const previewElement_ = result.queryByTestId(previewTestId);
              expect(previewElement_).toBeNull(); // Be defensive, should not be rendered

              fireEvent.change(inputElement, { target: { files: [file] } });
              fireEvent.blur(inputElement); // Must blur, to invoke validation message
              const previewElement = await result.findByTestId(previewTestId); // Not visible until used

              // Check attributes
              attributes.forEach((prop) => {
                expect(previewElement).toHaveAttribute(prop[0], prop[1]);
              });

              expect(previewElement).toBeVisible();
            });

            // +++ alt is updated +++
            it(`should have its alt text updated, when entered after attachment`, async () => {
              const result = renderSubmitPost();
              const inputElement = result.getByTestId(inputTestId);
              const imageAltInputElement = result.getByLabelText(reImageAltInputLabel);
              const altText = "fake image alt text";

              fireEvent.change(inputElement, { target: { files: [file] } });
              fireEvent.change(imageAltInputElement, { target: { value: altText } });
              const previewElement = await result.findByTestId(previewTestId); // Not visible until used

              expect(previewElement).toHaveAttribute("alt", altText);
            });

            // +++ alt is initialised +++
            it(`should have the correct alt text when entered prior to attachment`, async () => {
              const result = renderSubmitPost();
              const inputElement = result.getByTestId(inputTestId);
              const imageAltInputElement = result.getByLabelText(reImageAltInputLabel);
              const altText = "fake image alt text";

              fireEvent.change(imageAltInputElement, { target: { value: altText } });
              fireEvent.change(inputElement, { target: { files: [file] } });
              const previewElement = await result.findByTestId(previewTestId); // Not visible until used

              expect(previewElement).toHaveAttribute("alt", altText);
            });
          });
        }
      );
    });
  });
});
