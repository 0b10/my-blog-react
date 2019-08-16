import React from "react";
import { storiesOf } from "@storybook/react";
import _ from "lodash";
import Post from "./Post";
import PostsContainer from "./PostsContainer";
import { postProps } from "./fake-data";

const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

storiesOf("PostsContainer", module).add("Multiple Posts", () => (
  <PostsContainer>
    <React.Fragment>
      {_.range(1, 20).map((_, index) => (
        <Post
          {...postProps}
          key={index}
          imgUrl={`https://fakeql.com/placeholder/320/320/${randomStr()}.svg`}
        />
      ))}
    </React.Fragment>
  </PostsContainer>
));
