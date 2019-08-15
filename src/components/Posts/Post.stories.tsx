import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Post from "./Post";
import PostsContainer from "./PostsContainer";

const postProps = Object.freeze({
  imgAltText: "Example image alt text",
  imgUrl: "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg",
  postUrl: "#",
  routeHandler: () => null,
  title: "an example title",
  tldr:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
});

storiesOf("Post", module)
  .add("default", () => (
    <PostsContainer>
      <Post {...postProps} />
    </PostsContainer>
  ))
  .add("Small TL;DR", () => (
    <PostsContainer>
      <Post {...postProps} tldr="very little tl;dr" />
    </PostsContainer>
  ))
  .add("Click event", () => (
    <PostsContainer>
      <Post {...postProps} routeHandler={action("Changing route")} postUrl="/example/url" />
    </PostsContainer>
  ))
  .add("Long title", () => (
    <PostsContainer>
      <Post
        {...postProps}
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun"
      />
    </PostsContainer>
  ));
