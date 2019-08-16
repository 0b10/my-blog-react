import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Post from "./Post";
import PostsContainer from "./PostsContainer";
import { postProps } from "./fake-data";

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
