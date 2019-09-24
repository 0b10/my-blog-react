/* eslint-disable no-undef */
import React from "react";

import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { jsxDecorator } from "storybook-addon-jsx";
import { storiesOf } from "@storybook/react";
import { object, withKnobs } from "@storybook/addon-knobs";

import { NavBar } from ".";

const navBarNotes = `
<h1>NavBar</h1>
<ul>
  <li>
    When an item is clicked, the <em>routeHandler</em> is called, and passed the <em>href</em> as
    the only argument.
  </li>
  <li>
    <em>LineNumbers</em> is a helper component to visualise scrolling, and should be ignored.
  </li>
</ul>
`;

storiesOf("NavBar", module)
  .addDecorator(jsxDecorator)
  .addDecorator(withKnobs)
  .add(
    "Default",
    () => (
      <React.Fragment>
        <NavBar
          items={object("items", [
            {
              path: "route/one",
              text: "example one",
            },
            {
              path: "route/two",
              text: "example two",
            },
            {
              path: "route/three",
              text: "example three",
            },
          ])}
          routeHandler={action("Tab clicked")}
        />
        <LineNumbers />
      </React.Fragment>
    ),
    { notes: navBarNotes, jsx: { showFunctions: false } }
  );

const LineNumbers = () => (
  <div>
    {_.range(1, 500).map((lineNum: number) => {
      let backgroundColor: string;
      lineNum % 2 === 0 ? (backgroundColor = "#DDD") : (backgroundColor = "white");
      return (
        <div style={{ backgroundColor }} key={lineNum}>
          {lineNum}
        </div>
      );
    })}
  </div>
);
