import React from "react";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import faker from "faker";
import lodash from "lodash";

import Post from "./Post";
import PostsContainer from "./PostsContainer";

storiesOf("Post", module)
  .add("default", () => (
    <PostsContainer>
      <Post {...fakePostProps} />
    </PostsContainer>
  ))
  .add("Small TL;DR", () => (
    <PostsContainer>
      <Post {...fakePostProps} tldr="very little tl;dr" />
    </PostsContainer>
  ))
  .add("Click event", () => (
    <PostsContainer>
      <Post {...fakePostProps} routeHandler={action("Changing route")} postUrl="/example/url" />
    </PostsContainer>
  ))
  .add("Long title", () => (
    <PostsContainer>
      <Post
        {...fakePostProps}
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun"
      />
    </PostsContainer>
  ))
  .add("While loading...", () => (
    <PostsContainer>
      <Post {...fakePostProps} loading={true} />
    </PostsContainer>
  ));

storiesOf("PostsContainer", module).add("Multiple Posts", () => (
  <PostsContainer>
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
  </PostsContainer>
));

// >>> HELPERS >>>
const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

const fakePostProps = Object.freeze({
  imgAltText: "Example image alt text",
  imgUrl: "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg",
  loading: false,
  postUrl: "#",
  routeHandler: () => null,
  title: "an example title",
  tldr:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});
