import React from "react";
import { storiesOf } from "@storybook/react";
import lodash from "lodash";
import faker from "faker";
import Post from "./Post";
import PostsContainer from "./PostsContainer";
import { fakePostProps } from "./fake-data";
import { ThemeProvider } from "@material-ui/styles";
import { dark, light } from "../../mui-theme";
import { CssBaseline } from "@material-ui/core";
const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

storiesOf("Theme", module)
  .add("Dark", () => (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <Posts />
    </ThemeProvider>
  ))
  .add("Light", () => (
    <ThemeProvider theme={light}>
      <CssBaseline />
      <Posts />
    </ThemeProvider>
  ));

const Posts = () => (
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
);
