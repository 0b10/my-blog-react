import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import { dummyProps } from "./helpers";
import { Container } from "../Container";
import { Post } from "../Post";

describe("smoke tests: Post", () => {
  it("should render", () => {
    const result = render(<Post {...dummyProps} />);
    expect(result.getByTestId("post")).toBeVisible();
  });

  it("should export a ready-to-use, factory created Post", () => {
    const result = render(<Post {...dummyProps} />);
    expect(result.getByTestId("post")).toBeVisible();
  });

  it("exported pre-built Post(s) should not be the same object", () => {
    expect(<Post {...dummyProps} />).not.toBe(<Post {...dummyProps} />);
  });
});

describe("#smoke tests: Container", () => {
  it("should render", () => {
    const result = render(
      <Container>
        <Post {...dummyProps} />
      </Container>
    );

    expect(result.getByTestId("post")).toBeVisible();
  });
});
