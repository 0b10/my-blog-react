import React from "react";

import { storiesOf } from "@storybook/react";
import faker from "faker";

import Background from "./Background";
import Dates from "./Dates";
import Markdown from "./Markdown";

// >>> STORIES >>>
storiesOf("PostContent", module).add("Markdown", () => <Markdown>{exampleMarkdown}</Markdown>);

storiesOf("PostContent/Date", module)
  .add("'Created at' only", () => (
    <Background>
      <Dates createdAt="2019-01-01" modifiedAt="2019-01-01"></Dates>
      <Markdown>{"# Markdown Title"}</Markdown>
    </Background>
  ))
  .add("Both 'Created at' and 'Modified at'", () => (
    <Background>
      <Dates createdAt="2019-01-01" modifiedAt="2019-01-02"></Dates>
      <Markdown>{"# Markdown Title"}</Markdown>
    </Background>
  ));

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
