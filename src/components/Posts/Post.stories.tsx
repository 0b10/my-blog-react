import React from "react";
import { storiesOf } from "@storybook/react";
import Post from "./Post";

storiesOf("Post", module).add("default", () => <Post title="an Example Title" />);
