/* eslint-disable no-undef */
import React from "react";

import { action } from "@storybook/addon-actions";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { jsxDecorator } from "storybook-addon-jsx";
import { storiesOf } from "@storybook/react";
import faker from "faker";
import lodash from "lodash";

import { Post, PostData } from "./Post";
import { Posts } from ".";

// >>> HELPERS >>>
const randomStr = () =>
  Math.random()
    .toString(36)
    .substring(2);

const exampleTldr = `Lorem ipsum dolor sit amet, consectetur adipiscing.`;

const fakePostProps = Object.freeze({
  id: "1",
  imgAltText: "Example image alt text",
  imgUrl: "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg",
  loading: false,
  routeHandler: () => null,
  title: "an example title",
  tldr: exampleTldr,
});

const postNotes = `Post has a <strong>click handler</strong>, (routeHandler) it provides the post
ID of the post clicked.`;

// >>> STORIES >>>
const stories = storiesOf("Posts", module);

stories
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add(
    "Post",
    () => (
      <Post
        id={text("id", "1")}
        imgAltText={text("imgAltText", "Example image alt text")}
        imgUrl={text(
          "imgUrl",
          "https://fakeql.com/placeholder/320/320/e7d621158ec24ef6dsf3sf43459.svg"
        )}
        loading={boolean("loading", false)}
        routeHandler={action("Clicked post, got post ID")}
        title={text("title", "an example title")}
        tldr={text("tldr", exampleTldr)}
      />
    ),
    { notes: postNotes, jsx: { showFunctions: false } }
  );

stories.addDecorator(jsxDecorator).add(
  "Posts",
  () => {
    const postsData: PostData[] = [];
    for (let i = 0; i < 20; i++) {
      postsData.push({
        ...fakePostProps,
        imgAltText: faker.lorem.words(lodash.random(2, 5)),
        imgUrl: `https://fakeql.com/placeholder/320/320/${randomStr()}.svg`,
        id: String(20),
        title: faker.lorem.words(lodash.random(3, 20)),
        tldr: faker.lorem.words(lodash.random(20, 100)),
      });
    }
    return <Posts routeHandler={action("Clicked post, got post ID")} posts={postsData} />;
  },
  { notes: postNotes, jsx: { showFunctions: false, sortProps: false } }
);
