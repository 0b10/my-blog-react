import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import Background from "../Background";
import Heading from "../Heading";
import Markdown from "../Markdown";

describe("Unit Tests: Markdown", () => {
  // *  Test that the expected component/element is rendered. These component/elements are marked with a test id

  it("should parse implicit line breaks", async () => {
    const contentText = `
    one
    two
    three
    `;

    const result = render(<Markdown>{contentText}</Markdown>);

    expect(await result.findAllByText(/^(one|two|three)$/)).toHaveLength(3); // Three separate elements
  });

  [
    { elementName: "<p />", markdown: "test paragraph", testid: "markdown-paragraph" },
    { elementName: "heading 1", markdown: "# header", testid: "markdown-header-level-1" },
    { elementName: "heading 2", markdown: "## header", testid: "markdown-header-level-2" },
    { elementName: "heading 3", markdown: "### header", testid: "markdown-header-level-3" },
    { elementName: "heading 4", markdown: "#### header", testid: "markdown-header-level-4" },
    { elementName: "heading 5", markdown: "##### header", testid: "markdown-header-level-5" },
    { elementName: "heading 6", markdown: "###### header", testid: "markdown-header-level-6" },
    { elementName: "divider", markdown: "---", testid: "markdown-divider" },
    { elementName: "link", markdown: "[text](https://example.com)", testid: "markdown-link" },
    { elementName: "blockquote", markdown: "> quote", testid: "markdown-blockquote" },
    {
      elementName: "<img />",
      markdown: "![alt](https://example.com/img.jpg)",
      testid: "markdown-img"
    },
    {
      elementName: "<thead>",
      markdown: "\none | two\n--- | ---\nfoo | bar",
      testid: "markdown-thead"
    },
    {
      elementName: "<table>",
      markdown: "\none | two\n--- | ---\nfoo | bar",
      testid: "markdown-table"
    },
    { elementName: "<code />", markdown: "```javascript\n  code();\n```", testid: "markdown-code" },
    { elementName: "inline code", markdown: "`code()`", testid: "markdown-inline-code" },
    {
      elementName: "<ul>",
      markdown: "\n* one\n* two\n* three\n",
      testid: "markdown-unordered-list"
    },
    {
      elementName: "<ol>",
      markdown: "\n1. one\n2. two\n3. three\n",
      testid: "markdown-ordered-list"
    }
    // ~~~ Find Single Elements ~~~
  ].forEach(({ elementName, markdown, testid }: ITestMarkdownComponent) => {
    describe(elementName, () => {
      it(`should be rendered when given: "${markdown} [#Markdown,#unit]"`, async () => {
        const result = render(<Markdown>{markdown}</Markdown>);

        expect(await result.findByTestId(testid)).toBeVisible();
      });
    });
  });

  [
    {
      elementName: "<td>",
      markdown: "\none | two\n--- | ---\nfoo | bar",
      testid: "markdown-td"
    }
    // ~~~ Find Multiple Elements ~~~
  ].forEach(({ elementName, markdown, testid }: ITestMarkdownComponent) => {
    describe(elementName, () => {
      it(`should be rendered when given: "${markdown} [#Markdown,#unit]"`, async () => {
        const result = render(<Markdown>{markdown}</Markdown>);

        expect(await result.findAllByTestId(testid)).toHaveLength(4);
      });
    });
  });
});

describe("Unit Test: Background", () => {
  it("should render and be visible [#unit,#Background]", async () => {
    const result = render(
      <Background>
        <div>fake text</div>
      </Background>
    );

    expect(await result.findByText(/^fake text$/)).toBeVisible();
  });
});

describe("Unit Test: Heading", () => {
  it("should render and be visible [#unit,#Heading]", async () => {
    const result = render(<Heading>fake heading</Heading>);

    expect(await result.findByTestId("post-heading-h1")).toBeVisible();
  });
});

interface ITestMarkdownComponent {
  elementName: string;
  markdown: string;
  testid: string;
}
