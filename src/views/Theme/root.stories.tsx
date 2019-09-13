import React from "react";

import { action } from "@storybook/addon-actions";
import { object, string } from "yup";
import { storiesOf } from "@storybook/react";
import faker from "faker";
import lodash from "lodash";

import { NavBar } from "../NavBar";
import { PostContent } from "../PostContent";
import { Theme } from "./";
import { TThemeName } from "./themes";
import { withPostPreview } from "../SubmitPost";
import Container from "../Posts/Container";
import Markdown from "../PostContent/Markdown";
import Post from "../Posts/Post";

const SubmitPost = withPostPreview(PostContent);

const dummyProps = {
  onSubmit: () => null,
  validationSchema: object().shape({
    title: string()
      .min(3, "Must be 3 or more chars")
      .max(5, "Must be 5 or less chars")
      .required("Required"),
    body: string()
      .min(4, "Must be 4 or more chars")
      .max(6, "Must be 6 or less chars")
      .required("Required"),
    tldr: string()
      .min(5, "Must be 5 or more chars")
      .max(7, "Must be 7 or less chars")
      .required("Required")
  })
};

// >>> STORIES >>>
const themes: TThemeName[] = ["light", "dark"];
themes.forEach(theme => {
  storiesOf(`Theme/${theme}`, module)
    .add("Markdown", () => (
      <Theme theme={theme}>
        <Markdown>{exampleMarkdown}</Markdown>
      </Theme>
    ))
    .add("Posts", () => (
      <Theme theme={theme}>
        <TempPosts />
      </Theme>
    ))
    .add("NavBar", () => (
      <Theme theme={theme}>
        <NavBar
          items={[
            { path: "#", text: "one" },
            { path: "#", text: "two" },
            { path: "#", text: "three" }
          ]}
          routeHandler={action("Tab clicked")}
        />
      </Theme>
    ))
    .add("SubmitPost", () => {
      return (
        <Theme theme={theme}>
          <div style={{ padding: "20px" }}>
            <SubmitPost {...dummyProps} />
          </div>
        </Theme>
      );
    });
});

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
