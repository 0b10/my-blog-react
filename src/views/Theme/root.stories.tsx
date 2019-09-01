import React from "react";

import { storiesOf } from "@storybook/react";
import faker from "faker";
import lodash from "lodash";
import { Theme } from "./";

import Markdown from "../PostContent/Markdown";
import Post from "../Posts/Post";
import Container from "../Posts/Container";

// >>> STORIES >>>
storiesOf("Theme/Light", module)
  .add("Markdown", () => (
    <Theme theme="light">
      <Markdown>{exampleMarkdown}</Markdown>
    </Theme>
  ))
  .add("Posts", () => (
    <Theme theme="light">
      <TempPosts />
    </Theme>
  ));

storiesOf("Theme/Dark", module)
  .add("Markdown", () => (
    <Theme theme="dark">
      <Markdown>{exampleMarkdown}</Markdown>
    </Theme>
  ))
  .add("Posts", () => (
    <Theme theme="dark">
      <TempPosts />
    </Theme>
  ));

storiesOf("Theme", module);

// >>> TEMP COMPONENTS >>>
const TempPosts = () => (
  <Container>
    <React.Fragment>
      {lodash.range(1, 20).map((_, index) => (
        <Post
          {...fakePostProps}
          id={`${index + 1}`}
          key={index}
          imgUrl={`https://fakeql.com/placeholder/320/320/${randomStr()}.svg`}
          imgAltText={faker.lorem.words(lodash.random(2, 5))}
          title={faker.lorem.words(lodash.random(3, 20))}
          tldr={faker.lorem.words(lodash.random(20, 100))}
        />
      ))}
    </React.Fragment>
  </Container>
);

// >>> HELPERS >>>
const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

const fakePostProps = Object.freeze({
  imgAltText: "Example image alt text",
  imgUrl: "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg",
  loading: false,
  routeHandler: () => null,
  title: "an example title",
  tldr:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});

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
