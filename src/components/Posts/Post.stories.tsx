import React from "react";
import { storiesOf } from "@storybook/react";
import Post from "./Post";

const postProps = Object.freeze({
  title: "an example title",
  imgUrl: "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg",
  imgAltText: "Example image alt text"
});

storiesOf("Post", module).add("default", () => <Post {...postProps} />);
