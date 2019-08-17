import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Post from "./Post";
import PostsContainer from "./PostsContainer";
import { fakePostProps } from "./fake-data";

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
