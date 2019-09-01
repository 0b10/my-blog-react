import React from "react";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import faker from "faker";
import lodash from "lodash";

import Post from "./Post";
import Container from "./Container";

storiesOf("Post", module)
  .add("default", () => (
    <Container>
      <Post {...fakePostProps} />
    </Container>
  ))
  .add("Small TL;DR", () => (
    <Container>
      <Post {...fakePostProps} tldr="very little tl;dr" />
    </Container>
  ))
  .add("Click event", () => (
    <Container>
      <Post {...fakePostProps} routeHandler={action("Changing route")} id="1" />
    </Container>
  ))
  .add("Long title", () => (
    <Container>
      <Post
        {...fakePostProps}
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun"
      />
    </Container>
  ))
  .add("While loading...", () => (
    <Container>
      <Post {...fakePostProps} loading={true} />
    </Container>
  ));

storiesOf("Container", module).add("Multiple Posts", () => (
  <Container>
    <React.Fragment>
      {lodash.range(1, 20).map((_, index) => (
        <Post
          {...fakePostProps}
          key={index}
          imgUrl={`https://fakeql.com/placeholder/320/320/${randomStr()}.svg`}
          imgAltText={faker.lorem.words(lodash.random(2, 5))}
          title={faker.lorem.words(lodash.random(3, 20))}
          tldr={faker.lorem.words(lodash.random(20, 100))}
        />
      ))}
    </React.Fragment>
  </Container>
));

// >>> HELPERS >>>
const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

const fakePostProps = Object.freeze({
  id: "1",
  imgAltText: "Example image alt text",
  imgUrl: "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg",
  loading: false,
  routeHandler: () => null,
  title: "an example title",
  tldr:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});
