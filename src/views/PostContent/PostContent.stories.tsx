/* eslint-disable no-undef */
import React from "react";

import { jsxDecorator } from "storybook-addon-jsx";
import { storiesOf } from "@storybook/react";
import { text, withKnobs } from "@storybook/addon-knobs";
import faker from "faker";

import { Markdown } from "./Markdown";
import { PostContent } from "views";

// >>> HELPERS >>>
const exampleMarkdown = `
#### Headers

# H1\n

## H2\n

### H3\n

#### H4\n

##### H5\n

###### H6\n

---

#### Text

Paragraph\n with newline (\\n) char

Paragraph with
a single return (breaks plugin)

---

#### Text Emphasis

~~Strikethrough~~

_italics_

__bold__

---

#### Links

This is a [link](#), click it..

This is a [reference link][ref_link], click it...

[ref_link]: #

---

#### Block Quote

> ${faker.lorem.words(150)}

---

#### Images

##### Standard

![Alt Text](https://fakeql.com/placeholder/300/300/e7d621158ec24ef6dsf3sf43459.svg)

##### Reference

![Alt Text][reference_image]
[reference_image]: https://fakeql.com/placeholder/300/300/e7d621158ec24ef6dsf3sf43459.svg

---

#### Table

col one | col two
--- | ---
test text one  | test text one
test text two  | test text two

---

#### Lists

##### Unordered

* One
* Two
* Three

##### Ordered

1. One
1. Two
1. Three

---

#### Code

##### HTML As Text
<script>alert("Script injection - bad!")</script>
<div>
  <p>Escaped HTML!</p>
</div>

##### Inline

Some inline \`code()\`, and some extra text.

##### Code Block

\`\`\`javascript
function foo() {
  return "foo"
};

foo();
\`\`\`

\`\`\`html
<div>
  <p>Some HTML "code"</p>
</div>
\`\`\`

`;

const datesNotes = `
  <h1>Dates</h1>
  <ul>
    <li>
      When the <strong>createdAt</strong>, and <strong>modifiedAt</strong> dates are the same,
      only the <em>createdAt</em> date is displayed.
    </li>
    <li>
      You can see the <strong> header image alt</strong> text in your browser's inspector.
    </li>
  </ul>
`;

const headerImageNotes = `
  <h1>HeaderImage</h1>
  <ul>
    <li>
      You can see the <strong>alt</strong> text in your browser's inspector.
    </li>
  </ul>
`;

const markdownNotes = `
  <h1>Markdown</h1>
  <ul>
    <li>
      The markdown supports carriage return.
    </li>
  </ul>
`;

const stories = storiesOf("PostContent", module);

// >>> STORIES >>>
stories.add("All supported markdown features", () => <Markdown>{exampleMarkdown}</Markdown>, {
  notes: markdownNotes,
});

// BUG: > quote doesn't work for knob input
stories
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .add(
    "Modify props",
    () => (
      <PostContent
        title={text("title", "An Example Title")}
        tldr={text("tldr", "An Example TL;DR")}
        createdAt={text("createdAt", "2019-01-02")}
        modifiedAt={text("modifiedAt", "2019-01-02")}
        headerImageProps={{
          alt: text("headerImageProps.alt", "A procedurally generated header image"),
          src: text(
            "headerImageProps.src",
            "https://fakeql.com/placeholder/500/200/e7d621158ec24ef6dsf3sf43459.svg"
          ),
        }}
      >
        {text("Markdown", "Input custom markdown here")}
      </PostContent>
    ),
    { notes: datesNotes + markdownNotes + headerImageNotes }
  );
