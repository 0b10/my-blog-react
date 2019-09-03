import React from "react";

import { render } from "@testing-library/react";

import { INavBarProps, NavBar } from "../";

// >>> DUMMY PROPS >>>
/**
 * Default props for NavBar. This is implicitly used in renderNavBar, so you shouldn't need to
 *  directly use this.
 */
export const dummyNavBarProps: INavBarProps = {
  items: [
    { path: "/one", text: "one" },
    { path: "/two", text: "two" },
    { path: "/three", text: "three" }
  ],
  routeHandler: (path: string) => null
};

// >>> HELPERS >>>
/**
 * Render the NavBar component with the testing-library renderer. This is the function you need for
 *  testing.
 * @param manualProps - an object, containing any props. All members are merged with dummyNavBarProps,
 *  so there is a set of defaults to fallback on - you only need to specify those that you need to test.
 * @param manualProps = \{ routeHandler \} - the function to inject into the HOC to handle NavItem clicks: (path: string) => void,
 *  typically this is something like history.push, or console.log - anything that accepts a path string and
 *  will do something with it. It does not need to return anything.
 */
export const renderNavBar = (manualProps = {}) =>
  render(<NavBar {...dummyNavBarProps} {...manualProps} />);
