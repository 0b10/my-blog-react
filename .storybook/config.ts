import { addParameters, configure } from "@storybook/react";

addParameters({
  options: {
    panelPosition: "right",
  },
});

const req = require.context("../src/", true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
