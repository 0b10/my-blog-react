import React from "react";
import { storiesOf } from "@storybook/react";
import lodash from "lodash";
import faker from "faker";
import Post from "./Post";
import PostsContainer from "./PostsContainer";
import { fakePostProps } from "./fake-data";

const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

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
