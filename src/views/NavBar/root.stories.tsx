import React from "react";

import _ from "lodash";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";

import { NavBar } from "./";

storiesOf("NavBar", module).add("Default", () => (
  <React.Fragment>
    <NavBar
      items={[{ path: "#", text: "one" }, { path: "#", text: "two" }, { path: "#", text: "three" }]}
      routeHandler={action("Tab clicked")}
    />
    <LineNumbers />
  </React.Fragment>
));

const LineNumbers = () => (
  <div>
    {_.range(1, 500).map((lineNum: number) => {
      let backgroundColor: string;
      lineNum % 2 === 0 ? (backgroundColor = "#DDD") : (backgroundColor = "white");
      return <div style={{ backgroundColor }}>{lineNum}</div>;
    })}
  </div>
);
